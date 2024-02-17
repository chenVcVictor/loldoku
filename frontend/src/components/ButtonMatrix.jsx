import React from 'react'
import { useState } from 'react'
import {SelectChampPopup} from './index.js'

/**
 * Component creates a 4x4 matrix.
 * ______ label  label  label
 * label  button button button 
 * label  button button button 
 * label  button button button 
 * 
 * such that when button clicked, opens a select menu to choose a champion
 */


function createMap(numRows, numCols) {
  const initMap = {}
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      initMap[`${i}-${j}`] = "";
    }
  }

  return initMap;
}



function ButtonMatrix({champNames}) {
    const size = 4
    const [selectedChamp, setSelectedChamp] = useState("");   // tracks which champion was selected from popup

    const [selectedKey, setSelectedKey] = useState("");       // tracks selected button's key
    const [triggerPopup, setTriggerPopup] = useState(false)   // determines if popup should be open or not

    const [labelMap, setLabelMap] = useState(createMap(size, size)) // map of button key to labels

    // FROM ONLINE ON HOW TO UPDATE A MAP
    const updateLabelMap = (key, value) => {
      setLabelMap(prevMap => ({
        ...prevMap, // Spread the previous map to keep existing entries
        [key]: value, // Update the specific key with the new value
      }))}
    
    // Clickable regular button
    const regButton = (row, col) => (
      <button 
      key={`${row}-${col}`}
      className="w-24 h-24 border-2 hover:bg-sky-700"
      onClick={() => {
        setTriggerPopup(true)
        setSelectedKey(`${row}-${col}`)
      }}
      >
        {/* {`${row},${col}`} */}
        {`${labelMap[`${row}-${col}`]}`}
      </button>
    );

    // Non-clickable label button
    const labelButton = (row, col, text) => (
      <button 
      key={`${row}-${col}`}
      className = "w-12 h-12"
      disabled={true}
      >
        {`${text}`}
      </button>
    )
  
    // Create 4x4 matrix
    const matrix = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {

        // the buttons in 0th row or col should be labels
        if (row == 0 || col == 0) {
          if (row == 0 && col == 0) {
            matrix.push(labelButton(row, col, ""))
          } else {
            matrix.push(labelButton(row, col, "LABEL"))
          }

        }
        // otherwise clickable button
        else {
          matrix.push(regButton(row, col))
        }
      }
    }
    
    return (
      <>
        <div className="rounded-lg grid grid-cols-4 justify-center items-center bg-slate-900 text-slate-200 mr-5 p-10">
          {matrix}
        </div>
        <SelectChampPopup 
        trigger = {triggerPopup}
        setTrigger = {setTriggerPopup}
        // setTrigger = {setTrigger}
        champOptions= {champNames}
        selectedChamp = {selectedChamp}
        submitSelectedChamp = {(champ) => {
          setSelectedChamp(champ)
          setTriggerPopup(false)
          console.log("DEBUG--Inside ButtonMatrix: " + selectedChamp)

          updateLabelMap(selectedKey, champ)
        }}
        > </SelectChampPopup>
      </>
    );
  }
  



export default ButtonMatrix