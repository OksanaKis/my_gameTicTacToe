import './App.css';
import React from 'react';
import Board from './components/Board';
import Square from './components/Square';
import { useState } from 'react';

const defaultSquares = () => (new Array(9)).fill(null);

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);


  const handleClick = (index) => {
    if ((squares[index] !== null) || winner ) return;
    const isPlayerTurn = squares.filter(elemSquares => elemSquares !== null).length % 2 === 0;
    if (isPlayerTurn) {
       let newSquares = squares;
       newSquares[index] = 'x';
       setSquares([...newSquares]);
    }
  }

  
  return (
    <main>
      <div className='header'>Tic tac toe</div>
      <Board>
      {squares.map((square,index) =>
          <Square
            key={index}
            x={square==='x'?1:0}
            o={square==='o'?1:0}
            onClick={() => handleClick(index)} />
        )}
      </Board>
    </main>
  );
}

export default App;
