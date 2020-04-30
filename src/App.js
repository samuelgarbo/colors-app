import React, {Component} from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';


function App() {
  
    console.log(generatePalette(seedColors[5]))
    return (
      <div>
          <Palette palette={generatePalette(seedColors[5])}></Palette>
      </div>
    );
  
}

export default App;
