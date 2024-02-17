import React from 'react';
import { useState, useRef } from 'react';

/**
 * Component creates a popup with select options menu
 * Submit button will set the corresponding button's label
 * to the selected champion name.
 */


/** look into:
 * -- MUI (for components)
 * 
 */


/**
 * CURRENT BUGS:
 * 1. Selected values are one step behind
 * --Solution: Call useEffect somehow so the frame updates immediately? 
 * --Solution: look into useRef?
 */

function SelectChampPopup({ trigger, setTrigger, champOptions, selectedChamp, submitSelectedChamp}) {
  if (!trigger) return null;

  const [currentOption, setCurrentOption] = useState("")

  return (
    <div className="fixed inset-0 flex justify-center items-start py-20 bg-black bg-opacity-50 z-50">
      <div className="relative p-5 bg-zinc-800 rounded shadow-lg">
        <button 
        onClick={() => setTrigger(false)} 
        className="absolute top-0 right-0 rounded text-lg flex items-center justify-center w-5 h-6 text-slate-200"
        >
        x
        </button>
          <div>
              <h1 className = "text-slate-200"> Make your guess: </h1>
              <select 
              className='rounded px-1 py-1 my-2 bg-gray-100 cursor-pointer outline-none'
              value = {currentOption}
              onChange = {(e) => {
                setCurrentOption(e.target.value)
                console.log("DEBUG--Inside SELECT. Value of e.target.value: " + e.target.value)
                // console.log("DEBUG--INSIDE SELECT. Value of currentOption:  " + currentOption)
              }}
              >
              
                {champOptions.map((champ) => (
                  <option key={champ} value={champ}>{champ}</option>
                ))}
              </select>
              <button
              className = "border-2 rounded-lg bg-white hover:bg-zinc-400 px-1 m-1"
              onClick={() => {
                console.log("DEBUG--. Value of currentOption:  " + currentOption)
                submitSelectedChamp(currentOption)
                setCurrentOption('')
              }}
              >
                  ENTER
              </button>
          </div>
      </div>
    </div>
  );
}

export default SelectChampPopup;
