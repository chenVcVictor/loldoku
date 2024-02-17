import React from 'react';

/**
 * Component creates a popup with select options menu
 * Submit button will return the selected champion name 
 * to the corresponding button that clicked it.
 */

function SelectChampPopup({ trigger, setTrigger, champOptions}) {
  if (!trigger) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative p-5 bg-zinc-800 rounded shadow-lg">
        <button 
        onClick={setTrigger} 
        className="absolute top-0 right-0 rounded text-lg flex items-center justify-center w-5 h-6"
        >
        x
        </button>

        <div>
            <select 
            className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none'>
              {champOptions.map((champ, index) => (
                <option key={index} value={champ}>{champ}</option>
              ))}
            </select>
            <button
            className = "border-2 rounded-lg bg-white hover:bg-zinc-400 px-1 m-1"
            >
                ENTER
            </button>
        </div>
      </div>
    </div>
  );
}

export default SelectChampPopup;
