import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ButtonMatrix} from './components/index.js'

function App() {

  const [gameData, setGameData] = useState({})      // json obj. includes champion data
  const [champNames, setChampNames] = useState([])
  const [labels, setLabels] = useState({})

  const patchVersion = '14.3.1'                             // game version

  // fetch champion data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/loldoku/gameData/`)
    .then((res) => res.json())
    .then((dataObject) => {
      setChampNames(dataObject.championNames);
      setLabels(dataObject.labels);
    })
    }, [])
  
  console.log("HI HI HI ")
  // console.log(gameData)
  // const champNames = Object.values(gameData["championNames"]);  // array of champion name
  // const labels = Object.values(gameData["labels"])             // Dictionary of labels
  // console.log(champNames)
  
  return (
    <>
    <div
      className = "w-full h-screen flex justify-center items-center"
      style = {{
        backgroundImage: 'url(https://cdna.artstation.com/p/assets/images/images/001/207/466/large/suke-22.jpg?1442249023)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
      className = "p-10"
      >
        <ButtonMatrix
        champNames={champNames}
        labels = {labels}
        >

        </ButtonMatrix>

      </div>
    </div>

    </>
  )
}

export default App
