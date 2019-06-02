import React from 'react';
import { Board, PieceList, ModeControl } from './components';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


function App() {
  return (
    <div className="App">
      <DragDropContextProvider backend={HTML5Backend}>
        <ModeControl />
        <Board />
        <PieceList />
      </DragDropContextProvider>
    </div>
  );
}

export default App;
