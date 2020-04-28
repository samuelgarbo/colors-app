import React from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';

function App() {
  return (
    <div>
      	<Palette colors={seedColors[5].colors}></Palette>
    </div>
  );
}

export default App;
