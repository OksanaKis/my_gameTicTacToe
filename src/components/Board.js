import React, {useState} from 'react';
import Square from './Square';
import ComputerPlayer from '../Logic/ComputerPlayer'

function Board() {

    const [square, setSquare] = useState(Array(9).fill(null));

    const [stateX , setStateX] = useState(true);

    const boardCopy = [...square];


    const winner = calculateWinner(square);
    let status;
    if(winner) {
        status = 'Winner ' + winner;
    }
    else {
        status = 'Player turn : ' + (stateX ? 'X' : 'O');
    }

    if ( !winner && !boardCopy.includes(null)) {
        status = 'Draw game! There is no winner';
    }

    const renderSquare = (num) => {
        return (
            <Square value={square[num]} onClick={() =>
            handleClick(num)}/>
        )
    }

    
    const handleClick = (num) => {
        // console.log(num);
        // const squares = square.slice();
        // console.log(squares[num]);
        
        // if (squares[num] === null) {
        //     squares[num] = stateX ? 'X' : 'O';
        //     setSquare(squares);
        //     setStateX(!stateX); 
        // }
        // else {
        //     alert("Can't do that")
        // }

    
        // console.log(boardCopy);
        console.log(boardCopy[num]);
        if (winner || boardCopy[num]) return;
        boardCopy[num] = stateX ? 'X' : 'O';
        setSquare(boardCopy);
        setStateX(!stateX); 
        console.log(boardCopy);
        console.log(boardCopy[num]);
        
    }
    


    function calculateWinner(square) {
        const lines = [
            [0, 1, 2],  // lines[0]
            [3, 4, 5],  // lines[1]
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i]; // a way of distructuring

            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                return square[a];
            }
        }

      return null;
        
    }

    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div>
                {status}
            </div>
        </div>

    )
}

export default Board;