import React from "react";
import { useState } from "react";
import { SelectChampPopup } from "./index.js";

/**
 * Component creates a 4x4 matrix.
 * ______ label  label  label
 * label  button button button
 * label  button button button
 * label  button button button
 *
 * such that when button clicked, opens a select menu to choose a champion
 */

// function createMap(numRows, numCols) {
//   const initMap = {}
//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       initMap[`${i}-${j}`] = "";
//     }
//   }

//   return initMap;
// }

function ButtonMatrix({
  champNames,
  labels,
  labelMap,
  updateLabelMap,
  correctedMatrix,
  hasSubmitted,
}) {
  const size = 4;
  const [selectedChamp, setSelectedChamp] = useState(""); // tracks which champion was selected from popup

  const [selectedKey, setSelectedKey] = useState(""); // tracks selected button's key
  const [triggerPopup, setTriggerPopup] = useState(false); // determines if popup should be open or not

  const setBgColor = (row, col) => {
    console.log(hasSubmitted);
    if (hasSubmitted == true) {
      if (correctedMatrix[row - 1][col - 1] == true) {
        return "bg-green-500";
      } else {
        return "bg-red-500";
      }
    }
    return "";
  };

  // Clickable regular button
  const regButton = (row, col) => (
    <button
      key={`${row}-${col}`}
      className={`w-24 h-24 border-2 hover:bg-sky-700 ${setBgColor(row, col)}`}
      onClick={() => {
        setTriggerPopup(true);
        setSelectedKey(`${row}-${col}`);
      }}
    >
      {/* {`${row},${col}`} */}
      {`${labelMap[`${row}`][`${col}`]}`}
    </button>
  );

  // Non-clickable label button
  const labelButton = (row, col, text) => (
    <button key={`${row}-${col}`} className="w-12 h-12" disabled={true}>
      {`${text}`}
    </button>
  );

  // Create 4x4 matrix
  const matrix = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // the buttons in 0th row or col should be labels
      if (row == 0 || col == 0) {
        if (row == 0 && col == 0) {
          matrix.push(labelButton(row, col, ""));
        } else {
          matrix.push(labelButton(row, col, labels[`${row}-${col}`]));
          // updateLabelMap(`${row}-${col}`, labels[`${row}-${col}`])
        }
      }
      // otherwise clickable button
      else {
        matrix.push(regButton(row, col));
      }
    }
  }

  return (
    <>
      <div className="rounded-lg grid grid-cols-4 justify-center items-center bg-slate-900 text-slate-200 p-5 mr-4 ml-2">
        {matrix}
      </div>
      <SelectChampPopup
        trigger={triggerPopup}
        setTrigger={setTriggerPopup}
        // setTrigger = {setTrigger}
        champOptions={champNames}
        selectedChamp={selectedChamp}
        submitSelectedChamp={(champ) => {
          setSelectedChamp(champ);
          setTriggerPopup(false);
          // console.log("DEBUG--Inside ButtonMatrix: " + selectedChamp)

          updateLabelMap(selectedKey, champ);
        }}
      >
        {" "}
      </SelectChampPopup>
    </>
  );
}

export default ButtonMatrix;
