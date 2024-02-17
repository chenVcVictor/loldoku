import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ButtonMatrix, SelectChampPopup} from './components/index.js'

function App() {

  const [championData, setChampionData] = useState({})      // json obj. includes champion data
  const [triggerPopup, setTriggerPopup] = useState(false)   // determines if popup should be open or not

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


  const setTrigger = () => setTriggerPopup(prev => !prev)                   // function for setting popup trigger
  
  return (
    <>
    <div
      className = "w-full h-screen flex justify-center items-center"
      style = {{
        backgroundImage: 'url(https://cdna.artstation.com/p/assets/images/images/001/207/466/large/suke-22.jpg?1442249023)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <SelectChampPopup 
      trigger={triggerPopup}
      setTrigger = {setTrigger}
      champOptions= {champNames}
      ></SelectChampPopup>
      <div
      className = "p-10"
      >
        {/* <button onClick = {setTrigger}> click me for Popup</button> */}
        <ButtonMatrix eventClick = {setTrigger}>

        </ButtonMatrix>

      </div>
    </div>

    

        
    </>
  )
}

export default App
