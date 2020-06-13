import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';


class App extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors,

    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    })
  }
  deletePalette(id) {
    let updatedPalettes = this.state.palettes.filter(palette => palette.id !== id);
    this.setState({ palettes: updatedPalettes }, this.syncLocalStorage)
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm
            savePalette={this.savePalette}
            palettes={this.state.palettes}
            maxColors={this.props.maxColors}
            {...routeProps}
          ></NewPaletteForm>}
        ></Route>
        <Route
          exact
          path='/'
          render={(routeProps) => 
          <PaletteList
            palettes={this.state.palettes}
            deletePalette={this.deletePalette}
            {...routeProps}
          ></PaletteList>}
        ></Route>
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            ></Palette>)}
        ></Route>
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            ></SingleColorPalette>)}
        ></Route>
      </Switch>

    );
  }

}

export default App;
