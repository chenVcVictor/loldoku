import React from "react";
import { useState, useRef } from "react";

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
 *
 */

function SelectChampPopup({
  trigger,
  setTrigger,
  champOptions,
  selectedChamp,
  submitSelectedChamp,
}) {
  if (!trigger) return null;

  const [currentOption, setCurrentOption] = useState("");


// fixed inset-0 flex justify-center items-start py-20 bg-black bg-opacity-50 z-50
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button
          onClick={() => setTrigger(false)}
          className="exitButton"
        >
          x
        </button>
        <h1 className="textColor"> Make your guess: </h1>
        <select
          className="selectMenu"
          value={currentOption}
          onChange={(e) => {
            setCurrentOption(e.target.value);
          }}
        >
          {champOptions.map((champ) => (
            <option key={champ} value={champ}>
              {champ}
            </option>
          ))}
        </select>
        <button
          className="submitButton"
          onClick={() => {
            submitSelectedChamp(currentOption);
            setCurrentOption("");
          }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

export default SelectChampPopup;
