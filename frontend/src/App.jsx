import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ButtonMatrix} from './components/index.js'

function App() {

  const [championData, setChampionData] = useState({})      // json obj. includes champion data

  const patchVersion = '14.3.1'                             // game version

  // fetch champion data
  useEffect(() => {
    fetch(`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`)
    .then((res) => res.json())
    .then((dataObject) => {
      setChampionData(dataObject['data'])
    })
    }, [])

  const champNames = Object.values(championData).map(champ => champ.name);  // array of champion name
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
        >

        </ButtonMatrix>

      </div>
    </div>

    </>
  )
}

export default App
