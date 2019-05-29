import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Board } from './components/Board';

function App() {
  return (
    <div className="App">
      <Board 
        cellDimension={2}
        width={8}
        height={8}
      />
    </div>
  );
}

export default App;
