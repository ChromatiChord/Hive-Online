import HexContainer from './HexContainer';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import '../../App.css';
import { useFirstRender } from '../logic/FirstRenderCheck';
import { board_size, traversal_memory, createBoard, getPotentialHexes } from '../logic/BoardFunctions';


function placePotentialHexes(boardData, setBoardData, pieceType, turn, coordinates) {
  let board_copy = boardData;
  for (const coordinate of coordinates){
    console.log(coordinate);
}
}

function placeHex() {
  console.log("Hex Placed!");
}

function Board(props) {
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  const [boardData, setBoardData] = useState(() => createBoard());
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      let coords = getPotentialHexes(boardData, props["navbarSelection"], props["turn"], []);
    }
  }, [props["navbarSelection"]]);

  useEffect(() => {
    if (!firstRender) {
      let activePieceType = boardData[activeSquare["x"]][activeSquare["y"]]["pieces"].at(-1)[0]
      let coords = getPotentialHexes(boardData, activePieceType, props["turn"], [activeSquare["x"], activeSquare["y"]]);
    }
    
  }, [activeSquare]);

  return (
    <div>
      <table>
          {boardData.map((x, index_x) => 
            <tr key={`${index_x}`}>
              {x.map((y, index_y) =>
                <td key={`${index_x}, ${index_y}`}>{y["isHex"] ? 
                <HexContainer 
                coords={{"x": index_x, "y": index_y}} 
                activeSquare={activeSquare} 
                setActiveSquare={setActiveSquare}
                pieces={y["pieces"]}
                />
                : ""
                }</td>
              )}
            </tr>
          )}
      </table>
    </div>
  );
}

export default Board;


// ☠️ TEMP CODE GRAVEYARD ☠️

// let info = {
//   "isHex": true,
//   "pieces": [["Queen", "black"], ["Beetle", "white"]],
//   "coordinates": {"x": 0, "y": 0},
// }


// // when a token is selected in the navbar, calculates
// // which hexes the token can be placed on

// function highlightPlace(boardData, setBoardData, navbarSelection) {

// }


// let data = [
//   [0, 1, 2],
//   [0, 1, 2],
//   [0, 1, 2]
// ]
