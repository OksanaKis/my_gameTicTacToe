import React, {useState} from 'react';
import Square from './Square';

function Board() {

    const [square, setSquare] = useState(Array(9).fill(null));

    const [stateX , setStateX] = useState(true);

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

    // const doubleSquare = [
    //     [0, 1],[0, 2],[1, 2],
    //     [3, 4],[3, 5],[4, 5],
    //     [6, 7],[6, 8],[7, 8],
    //     [0, 3],[0, 6],[3, 6],
    //     [1, 4],[1, 7],[4, 7],
    //     [2, 5],[2, 8],[5, 8],
    //     [0, 4],[0, 8],[4, 8],
    //     [2, 4],[2, 6],[4, 6],
    // ];

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
        // console.log(boardCopy[num]);
        // if (winner || boardCopy[num]) return;
        // boardCopy[num] = stateX ? 'X' : 'O';
        // setSquare(boardCopy);
        // setStateX(!stateX); 
        // console.log(boardCopy);
        // console.log(boardCopy[num]);


        if (winner || boardCopy[num]) return;
        boardCopy[num] = 'X';
        setSquare(boardCopy);
        // setTimeout(computerMove, 600);
        // computerMove(); 
        computerMove();
    }

    
    function computerMove() {
        console.log(boardCopy);
        const random = Math.floor(Math.random() * 8);
        if (boardCopy[4] === null) {
            boardCopy[4] = 'O';
        }
        else if (boardCopy[random] === null){
            boardCopy[random] = 'O';
        }  
        else if (boardCopy.includes(null)) computerMove();
        else return;
        setSquare(boardCopy);
        console.log(boardCopy);
    }

    // function calculateSquare(square) {
    //     for (let i = 0; i < doubleSquare.length; i++) {
    //         const [a,b] = doubleSquare[i];
    //         if (square[a] === square[b]) {
                
    //         }
    //     }
    // }

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