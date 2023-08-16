import logo from './logo.svg';
import './App.css';
import Dice from './Components/Dice';
import React from 'react';
import Confetti from "react-confetti"


function App() {

  const [randomNum, setRandomNum] = React.useState(["", "", "", "", "", "", "", "", "", ""])
  const [completed, setCompleted] = React.useState([false, false, false, false, false, false, false, false, false, false])
  const [buttonText, setButtonText] = React.useState("Roll")
  const [tenzies, setTenzies] = React.useState(false)
  const [resetting, setResetting] = React.useState(false);

  React.useEffect(() => {
    checkProgress()
    if (resetting) {
      setCompleted(Array(10).fill(false)); 
      setResetting(false);
    }
  }, [randomNum, completed])
  
  function genRandomNum() {
    if (buttonText === "New Game") {
      resetGame();
      return;
    }
    
    setRandomNum(prevArray => {
      return prevArray.map((num, index) => {
        if (!completed[index]) {
          return Math.floor((Math.random() * 6) + 1).toString();
        }
        return num;
      });
    });

    checkProgress()
  }

  function handleClick(index) {
    setCompleted(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  }

  function checkProgress() {
    if (completed.every(element => element === true)) {
      if (randomNum.every(v => v === randomNum[0])) {
        console.log("You won")
        gameEnd()
      }
      else {
        console.log("You lost")
      }
    }
  }

  function gameEnd() {
    setButtonText("New Game")
    setTenzies(true)
  }

  function resetGame() {
    setButtonText("Roll");
    setTenzies(false);
    setRandomNum(Array.from({ length: 10 }, () => Math.floor((Math.random() * 6) + 1).toString()));
    setCompleted(Array(10).fill(false));
    setResetting(true);
  }
  
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <div className='Text'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='Dices'>
      {randomNum.map((value, index) => (
          <Dice
            key={index}
            handleClick={() => handleClick(index)}
            value={value}
            index={index}
            isSelected={completed[index]}
            resetting={resetting}
          />
        ))}
        </div>
        <button onClick={genRandomNum}>{buttonText}</button>
    </div>
  );
}

export default App;
