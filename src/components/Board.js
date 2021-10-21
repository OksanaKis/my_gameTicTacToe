import React, {useState} from 'react';
import Square from './Square';

function Board() {

    const [square, setSquare] = useState(Array(9).fill(null));

    const boardCopy = [...square];

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

    const winner = calculateWinner(square);
    let status;
    if(winner) {
        status = 'Winner ' + winner;
    }
    else {
        status = 'Player turn : X';
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
        if (winner || boardCopy[num]) return;
        boardCopy[num] = 'X';
        console.log(boardCopy);
        let check = calculateWinner(boardCopy);
        if(check === 'X' || !boardCopy.includes(null)) {  
            setSquare(boardCopy);
            return;
        }
        let finalBoard = computerMove(boardCopy); 
        console.log(boardCopy); 
        console.log(finalBoard);
        setSquare(finalBoard); 
    }

    
    function computerMove(boardCopy) {
        console.log(boardCopy);
        const numSquare = calculateSquare(boardCopy);
        console.log(numSquare);
        const random = Math.floor(Math.random() * 8);
        if (boardCopy[4] === null) {
            boardCopy[4] = 'O';
            return boardCopy;
        }
        if (boardCopy[numSquare] === null) {
            boardCopy[numSquare] = 'O';
            return boardCopy;
        }
        if (boardCopy[random] === null){
            boardCopy[random] = 'O';
            return boardCopy;
        }  
        if (boardCopy.includes(null)) {
            computerMove(boardCopy);
        }
        // else return boardCopy;
    }

    function calculateSquare(handle) {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if ((handle[a] === handle[b]) && handle[c] === null) {
                console.log("c");
                return c;
            }
            if (handle[c] != null && (handle[a] === handle[c]) && handle[b] === null) {
                console.log("b");
                return b;
            }
            if (handle[b] != null && (handle[b] === handle[c]) && handle[a] === null) {
                console.log ("a");
                return a;
            }
        }
        console.log("calculateSquare");
        return null;
    }

    function calculateWinner(square) {
        // const lines = [
        //     [0, 1, 2],  // lines[0]
        //     [3, 4, 5],  // lines[1]
        //     [6, 7, 8],
        //     [0, 3, 6],
        //     [1, 4, 7],
        //     [2, 5, 8],
        //     [0, 4, 8],
        //     [2, 4, 6],
        // ];

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