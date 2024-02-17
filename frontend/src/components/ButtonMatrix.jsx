import React from 'react'

/**
 * Component creates a 4x4 matrix.
 * ______ label  label  label
 * label  button button button 
 * label  button button button 
 * label  button button button 
 * 
 * such that when button clicked, opens a select menu to choose a champion
 */



function ButtonMatrix({eventClick}) {
    const size = 4;
    
    // Clickable regular button
    const regButton = (row, col) => (
      <button 
      key={`${row}-${col}`}
      className="w-24 h-24 border-2 hover:bg-sky-700"
      onClick={eventClick}
      >
        {`${row},${col}`}
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
      <div className="rounded-lg grid grid-cols-4 justify-center items-center bg-slate-900 text-slate-200 mr-5 p-10">
        {matrix}
      </div>
    );
  }
  



export default ButtonMatrix