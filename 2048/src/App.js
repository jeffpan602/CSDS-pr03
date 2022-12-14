import './App.css';
import React, { useEffect, useState } from 'react'
import cloneDeep from "lodash.clonedeep";
import { useKeyEvent, getColors } from './keyUtil';


function App() {

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const [gameOver, setGameOver] = useState(false)

  const leftkey = 37;
  const rightKey = 39;
  const upKey = 38;
  const downKey = 40;


  //Gives 2 random numbers for the board after a turn
  const addNumber = (newGrid) => {
    let added = false
    let isFullGrid = false
    let attempts = 0

    while (!added) {
      if (isFullGrid)
        break;

      let start1 = Math.floor(Math.random() * 4);
      let start2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[start1][start2] === 0) {
        newGrid[start1][start2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  }

  //Initialize the grid with two random numbers 
  const initialize = () => {
    let newGrid = cloneDeep(data)
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  }

  //Rests the grid
  const reset = () => {
    setGameOver(false);
    const resetGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(resetGrid);
    addNumber(resetGrid);
    setData(resetGrid);
  };

  const swipeUp = (sub) => {
    let arr = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (arr[slow][i] === 0 && arr[fast][i] === 0) {
          fast++;
        } else if (arr[slow][i] === 0 && arr[fast][i] !== 0) {
          arr[slow][i] = arr[fast][i];
          arr[fast][i] = 0;
          fast++;
        } else if (arr[slow][i] !== 0 && arr[fast][i] === 0) {
          fast++;
        } else if (arr[slow][i] !== 0 && arr[fast][i] !== 0) {
          if (arr[slow][i] === arr[fast][i]) {
            arr[slow][i] = arr[slow][i] + arr[fast][i];
            arr[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(arr)) {
      addNumber(arr);
    }
    if (sub)
      return arr;
    else
      setData(arr);
  }

  const swipeDown = (sub) => {
    let arr = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));

    for (let i = 3; i >= 0; i--) {
      let slow = arr.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (arr[slow][i] === 0 && arr[fast][i] === 0) {
          fast--;
        } else if (arr[slow][i] === 0 && arr[fast][i] !== 0) {
          arr[slow][i] = arr[fast][i];
          arr[fast][i] = 0;
          fast--;
        } else if (arr[slow][i] !== 0 && arr[fast][i] === 0) {
          fast--;
        } else if (arr[slow][i] !== 0 && arr[fast][i] !== 0) {
          if (arr[slow][i] === arr[fast][i]) {
            arr[slow][i] = arr[slow][i] + arr[fast][i];
            arr[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(arr) !== JSON.stringify(oldData)) {
      addNumber(arr);
    }
    if (sub)
      return arr;
    else
      setData(arr);
  }

  const swipeLeft = (sub) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let arr = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (arr[slow] === 0 && arr[fast] === 0) {
          fast++;
        } else if (arr[slow] === 0 && arr[fast] !== 0) {
          arr[slow] = arr[fast];
          arr[fast] = 0;
          fast++;
        } else if (arr[slow] !== 0 && arr[fast] === 0) {
          fast++;
        } else if (arr[slow] !== 0 && arr[fast] !== 0) {
          if (arr[slow] === arr[fast]) {
            arr[slow] = arr[slow] + arr[fast];
            arr[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (sub)
      return newArray;
    else
      setData(newArray);
  }

  const swipeRight = (sub) => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let arr = newArray[i];
      let slow = arr.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (arr[slow] === 0 && arr[fast] === 0) {
          fast--;
        } else if (arr[slow] === 0 && arr[fast] !== 0) {
          arr[slow] = arr[fast];
          arr[fast] = 0;
          fast--;
        } else if (arr[slow] !== 0 && arr[fast] === 0) {
          fast--;
        } else if (arr[slow] !== 0 && arr[fast] !== 0) {
          if (arr[slow] === arr[fast]) {
            arr[slow] = arr[slow] + arr[fast];
            arr[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (sub)
      return newArray;
    else
      setData(newArray);
  }

  const handleKey = (event) => {
    switch (event.keyCode) {
      default:
        break
      case leftkey:
        swipeLeft()
        break
      case rightKey:
        swipeRight()
        break
      case upKey:
        swipeUp()
        break
      case downKey:
        swipeDown()
        break
    }
    if (checkGameOver()) {
      setGameOver(true);
      alert("GAME OVER :( \nPress New Game to play again!")
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  useKeyEvent('keydown', handleKey)

  const checkGameOver = () => {
    let checkerUp = swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(checkerUp))
      return false;

    let checkerDown = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checkerDown))
      return false;

    let checkerLeft = swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(checkerLeft))
      return false;

    let checkerRight = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checkerRight))
      return false;

    return true;
  };

  const Block = ({ num }) => {
    const { blockStyle } = style
    //{num !== 0 ? num : ""}
    return (
      <div
        style={{
          ...blockStyle,
          background: getColors(num),
          color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
        }}>
        {num !== 0 ? num : ""}
      </div>
    )
  }

  return (
    <div className='2048'>
      <h1 className='header'>2048</h1>
      <div className='board' style={{
        background: "#AD9D8F",
        width: "max-content",
        height: "max-content",
        margin: "auto",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        position: "relative",
      }}>
        {data.map((row, indexA) => {
          return (
            <div style={{ display: "flex" }} key={indexA}>
              {row.map((digit, indexB) => (
                <Block num={digit} key={indexB} />
              ))}
            </div>
          );
        })}
      </div>
      <div className='resetBtn' onClick={reset} style={{
        padding: 10,
        background: "#AD9D8F",
        color: "#F8F5F0",
        width: 80,
        borderRadius: 5,
        fontWeight: "750",
        margin: "auto",
        marginTop: 15,
        cursor: "pointer",
      }}>New Game</div>
    </div>
  );
}

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "750",
    color: "white",
  }
}

export default App;
