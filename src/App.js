import './App.css';
import React from 'react';
import Board from './components/Board';
import Square from './components/Square';
import { useState, useEffect } from 'react';

const defaultSquares = () => (new Array(9)).fill(null);

const lines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
];

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);
  const [level, setLevel] = useState('easy');

  useEffect (() => {
    const isComputerTurn = squares.filter(elemSquares => elemSquares !== null).length % 2 === 1;
    const checkLines = (a,b,c) => {
      return lines.filter(squaresIndexes => {
            const checkSquares = squaresIndexes.map(index => squares[index]);
            return JSON.stringify([a,b,c].sort()) === JSON.stringify(checkSquares.sort()); 
});
};

const emptyIndexes = squares
  .map((elemSquares,index) => elemSquares === null ? index : null)
  .filter(elem => elem !== null);
const playerWon = checkLines('x', 'x', 'x').length > 0;
const computerWon = checkLines('o', 'o', 'o').length > 0;

if (computerWon) {
  setWinner('o');
  return;
}
if (playerWon) {
  setWinner('x');
  return;
}
if (emptyIndexes.length === 0) {
  setWinner('draw');
  return;
}

const putComputer = index => {
  let newSquares = [...squares];
  newSquares[index] = 'o';
  setSquares([...newSquares]);
};


if (isComputerTurn && emptyIndexes.length > 0) {

  if (level === 'normal' && squares[4] === null) {
    putComputer(4);
    return;
  }

  const winingLines = checkLines('o', 'o', null);
  if (winingLines.length > 0) {
    const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
    putComputer(winIndex);
    return;
  }

  const linesToBlock = checkLines('x', 'x', null);
  if (linesToBlock.length > 0) {
    const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
    putComputer(blockIndex);
    return;
  }

  const randomIndex = emptyIndexes[ Math.floor(Math.random()*emptyIndexes.length) ];
  putComputer(randomIndex);
}
  }, [squares]);


  const handleClick = (index) => {
    if ((squares[index] !== null) || winner ) return;
    const isPlayerTurn = squares.filter(elemSquares => elemSquares !== null).length % 2 === 0;
    if (isPlayerTurn) {
       let newSquares = squares;
       newSquares[index] = 'x';
       setSquares([...newSquares]);
    }
  }

  const resetClick = () => {
    setWinner(null);
    setSquares(defaultSquares);
  }

  const changeLevel = () => {
    console.log('changeLevel')
    if (level === 'easy') setLevel('normal');
    if (level === 'normal') setLevel('easy');
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
      {!!winner && winner === 'x' && (
        <div className="result green">
          You WON!
        </div>
      )}
      {!!winner && winner === 'o' && (
        <div className="result red">
          You LOST!
        </div>
      )}
      {!!winner && winner === 'draw' && (
        <div className="result yellow">
        DRAW game! 
      </div>
      )} 
      <div className="button_div">
      <button className={level === "easy" ? "active" : "button"}  
              onClick={changeLevel}>Easy level</button>
      <button className={level === "normal" ? "active" : "button"}  
              onClick={changeLevel}>Normal level</button>
      <button className="button_reset" 
      onClick={resetClick}>Reset</button>
      </div>
    </main>
  );
}

export default App;
