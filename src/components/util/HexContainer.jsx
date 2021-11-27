import styled from 'styled-components';
import BlankHex from '../../assets/BlankHex.png'
import AntWhite from '../../assets/pieces/AntWhite.png'
import AntBlack from '../../assets/pieces/AntBlack.png'
import { useState, useEffect } from 'react';

function hexSelect(coordinates, activeSquare, setActiveSquare) {
  console.log(`Hex: [${coordinates["x"]}, ${coordinates["y"]}]`);
  setActiveSquare(coordinates);
}

function HexContainer({coordinates, activeSquare, setActiveSquare}) {
  // let saved_coords = coordinates;
  const [active, setActive] = useState(activeSquare); 

  return (
    <img src={
      JSON.stringify(activeSquare) !== JSON.stringify(coordinates) ? AntWhite : AntBlack} 
      width="110px" 
      draggable="false"
      onClick={() => hexSelect(coordinates, activeSquare, setActiveSquare)}/>
  );
}

export default HexContainer;