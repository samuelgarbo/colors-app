import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';


function App() {
  
    console.log(generatePalette(seedColors[1]))
    return (
      <Switch>
        <Route exact path='/'></Route>
        <Route exact path='/palette/:id'></Route>
      </Switch>
      // <div>
      //     <Palette palette={generatePalette(seedColors[1])}></Palette>
      // </div>
    );
  
}

export default App;
