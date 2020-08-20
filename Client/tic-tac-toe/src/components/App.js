import React,{useState} from "react";
import Game from "./Game";
import Records from "./Records";
import WinPopup from "./WinPopup";


function App() {
  const [isGameOver, setIsGameOver] = useState(false);

    return (
        <>
            <Game setGameOver={setIsGameOver}/>
            <Records />
            {isGameOver && <WinPopup/>}
            <WinPopup open={isGameOver}/>
        </>
    );
}

export default App;
