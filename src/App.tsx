import React from 'react';
import './App.css';
import { Board, PieceList } from './components';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


function App() {
  return (
    <div className="App">
      <DragDropContextProvider backend={HTML5Backend}>
        <Board 
          cellDimension={1}
          width={8}
          height={8}
        />
        <PieceList />
      </DragDropContextProvider>
    </div>
  );
}

export default App;
