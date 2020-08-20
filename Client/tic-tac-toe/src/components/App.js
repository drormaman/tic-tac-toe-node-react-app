import React, { useState, useEffect } from "react";
import Game from "./Game";
import Records from "./Records";
import WinPopup from "./WinPopup";

function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [playerName, setPlayerName] = useState();
    const [gameStartTime, setGameStartTime] = useState();
    const [gameEndTime, setGameEndTime] = useState();
    const [playerId, setPlayerId] = useState(1);

    const startGameTime = () => {
        const date = new Date();
        setGameStartTime(date);
    };
    const stopGameTime = () => {
        const date = new Date();
        setGameEndTime(date);
    };
    function calculateGameTime() {
        const gameTime = (new Date(gameEndTime - gameStartTime).getTime()/1000).toFixed(0);
        return gameTime;
    }
    function formatGameStart() {
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        const formattedDate = new Date(gameStartTime - timezoneOffset)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        return formattedDate;
    }

    const submitUser = () => {
        setIsGameOver(false);
        calculateGameTime();
        const newPlayerRecord = {
            id: playerId,
            winnerName: playerName,
            date: formatGameStart(),
            gameDuration: calculateGameTime()
        };
        fetch("/api/v1/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlayerRecord),
        });
        setPlayerId(playerId + 1);
    };

    return (
        <>
            <Game
                setGameOver={setIsGameOver}
                stopGameTime={stopGameTime}
                startGameTime={startGameTime}
            />
            <Records isGameOver={isGameOver} />
            <WinPopup
                open={isGameOver}
                playerName={playerName}
                changeName={setPlayerName}
                onSubmit={submitUser}
            />
        </>
    );
}

export default App;
