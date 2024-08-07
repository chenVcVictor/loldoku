import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ButtonMatrix } from "./components/index.js";

import './styles.css';

import Confetti from "react-confetti";

function createMap(numRows, numCols) {
  const initMap = {};
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      initMap[`${i}-${j}`] = "";
    }
  }
  return initMap;
}

function App() {
  const [gameData, setGameData] = useState({}); // json obj. includes champion data
  const [champNames, setChampNames] = useState([]);
  const [labels, setLabels] = useState({});
  const [correctedMatrix, setCorrectedMatrix] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);

  const ansAllCorrect = correctedMatrix.every((row) =>
    row.every((element) => element == true)
  );
  const [labelMap, setLabelMap] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  // FROM ONLINE ON HOW TO UPDATE A MAP
  const updateLabelMap = (key, value) => {
    setLabelMap((current) => {
      const parts = key.split("-"); // Split the string at '-'
      const row = parseInt(parts[0], 10); // Convert the first part to an integer
      const col = parseInt(parts[1], 10); // Convert the second part to an integer
      const updatedMap = current.map((innerArray) => [...innerArray]);

      updatedMap[row][col] = value;
      return updatedMap;
    });
  };

  // fetch champion data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/loldoku/gameInit/`)
      .then((res) => res.json())
      .then((dataObject) => {
        setChampNames([" ", ...dataObject.championNames]);
        setLabels(dataObject.labels);
      });
  }, []);

  // post request: submit labelMap to validate user's answers
  const submit = () => {
    fetch("http://127.0.0.1:8000/loldoku/validateAnswer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labelMap: labelMap }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHasSubmitted(true);
        setCorrectedMatrix(data.correctedMatrix);
      })
      .catch((error) => console.error("Submit Error"));
  };

  return (
    <>
      <div
        class = "backgroundImage"
      >
        <div class = "gameContainer">
          <ButtonMatrix
            champNames={champNames}
            labels={labels}
            labelMap={labelMap}
            updateLabelMap={updateLabelMap}
            correctedMatrix={correctedMatrix}
            hasSubmitted={hasSubmitted}
          ></ButtonMatrix>
          {ansAllCorrect && <Confetti />}
          <button
            class = "submitButton"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
