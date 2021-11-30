import SelectionOverlay from '../../assets/LocationSelector.png'
import { useState, useEffect } from 'react';

function SelectionHex({coords, confirmPlacement, selectionData, boardData, setBoardData, turn, setTurn}) {
  return (
    <>
      <img 
      src={SelectionOverlay}
      onClick={() => confirmPlacement(coords, selectionData, boardData, setBoardData, turn, setTurn)}/>
    </>
  );
}

export default SelectionHex;
