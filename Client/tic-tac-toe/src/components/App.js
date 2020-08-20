import React,{useState} from "react";
import Game from "./Game";
import Records from "./Records";
import WinPopup from "./WinPopup";


function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerName, setPlayerName] = useState();

  const submitUser = () => {
    setIsGameOver(false);
    const newPlayerRecord = {
        "id": 1,
        "winnerName": playerName,
        "date": "2020-08-01 23:30:43"
    }
    fetch('/api/v1/records',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlayerRecord)});
}

    return (
        <>
            <Game setGameOver={setIsGameOver}/>
            <Records isGameOver={isGameOver} />
            <WinPopup open={isGameOver} playerName={playerName} changeName={setPlayerName} onSubmit={submitUser} />
        </>
    );
}

export default App;
