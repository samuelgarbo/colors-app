import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';


class App extends Component { 
    
    findPalette(id){
      return seedColors.find((palette) => {
        return palette.id === id;
      })
    }
    render(){
      return (
        <Switch>
          <Route exact path='/' render={(routeProps)=> <PaletteList palettes={seedColors} {...routeProps}></PaletteList>}></Route>
          <Route 
            exact 
            path='/palette/:id' 
            render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            ></Palette>)}></Route>
            <Route exact path='/palette/:paletteId/:colorId' render={()=><h1>Color page</h1>}></Route>
        </Switch>
       
      );
    }
  
}

export default App;
