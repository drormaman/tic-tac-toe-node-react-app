import React, { useState, useEffect } from "react";
import Board from './Board';

function Game(props) {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [step, setStep] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    let current = history[step];
    let winner = calculateWinner(current.squares);



    const handleClick = (i) => {
        const newHistory = history.slice(0, step + 1);
        current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        props.setGameOver(false);

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";

        setHistory(newHistory.concat([{squares}]));
        setStep(newHistory.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (stepNum) => {
        setStep(stepNum);
        setXIsNext(stepNum % 2 === 0);
    }
    
    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    }

    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner" + winner;
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }
    useEffect(() => {
        if(winner){
            props.setGameOver(true);
            props.stopGameTime();
        }else{
            props.startGameTime();
        }
    },[winner])

    return(
        <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
    );
}

export default Game;