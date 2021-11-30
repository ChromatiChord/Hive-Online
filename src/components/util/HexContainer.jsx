import BlankHex from '../../assets/BlankHex.png'
import AntWhite from '../../assets/pieces/AntWhite.png'
import AntBlack from '../../assets/pieces/AntBlack.png'
import BeetleWhite from '../../assets/pieces/BeetleWhite.png'
import BeetleBlack from '../../assets/pieces/BeetleBlack.png'
import GrassWhite from '../../assets/pieces/GrassWhite.png'
import GrassBlack from '../../assets/pieces/GrassBlack.png'
import QueenWhite from '../../assets/pieces/QueenWhite.png'
import QueenBlack from '../../assets/pieces/QueenBlack.png'
import SpiderWhite from '../../assets/pieces/SpiderWhite.png'
import SpiderBlack from '../../assets/pieces/SpiderBlack.png'
import SelectionHex from './SelectionHex'
import { useState, useEffect } from 'react';

function hexSelect(coordinates, setActiveSquare, boardData, turn) {
  console.log(`Hex Coordinates: [${coordinates["x"]}, ${coordinates["y"]}]`);
  let hex_data = boardData[coordinates["x"]][coordinates["y"]]["pieces"];
  if (hex_data.length !== 0) {
    if (hex_data.at(-1)[1] === turn["colour"]) setActiveSquare(coordinates);
  }
}

// figures out which piece to render
function getCorrectIcon(pieces) {
  if (pieces.length === 0) {
    return ""
  } 
  else {
    const topmost_piece = pieces.at(-1);
    switch(topmost_piece[0]){
      case "Ant":
        return topmost_piece[1] === "white" ? AntWhite : AntBlack;
      case "Beetle":
        return topmost_piece[1] === "white" ? BeetleWhite : BeetleBlack;
      case "Grasshopper":
        return topmost_piece[1] === "white" ? GrassWhite : GrassBlack;
      case "Spider":
        return topmost_piece[1] === "white" ? SpiderWhite : SpiderBlack;
      case "Queen":
        return topmost_piece[1] === "white" ? QueenWhite : QueenBlack;
    }
  }
}

function HexContainer({coords, setActiveSquare, pieces, selectionData, placeHexFunc, boardData, setBoardData, turn, setTurn}) {
  const coordinates = coords; 
  return (
    <>
      <img src={getCorrectIcon(pieces)} 
        draggable="false"
        onClick={() => hexSelect(coordinates, setActiveSquare, boardData, turn)}
      />
      {selectionData.length !== 0 && 
      <SelectionHex
        coords={coords}
        confirmPlacement={placeHexFunc}
        selectionData={selectionData[0]}
        boardData={boardData}
        setBoardData={setBoardData}
        turn={turn}
        setTurn={setTurn}
      />}
    </>
  );
}

export default HexContainer;


//JSON.stringify(activeSquare) !== JSON.stringify(coordinates)

//hexSelect(coordinates, setActiveSquare, activeSquare)