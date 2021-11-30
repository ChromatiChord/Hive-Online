import HexContainer from './HexContainer';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import '../../App.css';
import { useFirstRender } from '../logic/FirstRenderCheck';
import { board_size, traversal_memory, createBoard, getPotentialHexes, selection_hexes, clearSelectionHexes, placePotentialHexes, placeHex } from '../logic/BoardFunctions';

function Board(props) {
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  const [boardData, setBoardData] = useState(() => createBoard());
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      getPotentialHexes(boardData, props["navbarSelection"], props["turn"], []);
      placePotentialHexes(boardData, setBoardData, props["navbarSelection"], [-1, -1]);
    }
  }, [props["navbarSelection"]]);

  useEffect(() => {
    if (!firstRender) {
      let activePieceType = boardData[activeSquare["x"]][activeSquare["y"]]["pieces"].at(-1);
      getPotentialHexes(boardData, activePieceType, props["turn"], [activeSquare["x"], activeSquare["y"]]);
      placePotentialHexes(boardData, setBoardData, activePieceType, [activeSquare["x"], activeSquare["y"]]);
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
                setActiveSquare={setActiveSquare}
                pieces={y["pieces"]}
                selectionData={y["selection"]}
                placeHexFunc={placeHex}
                boardData={boardData}
                setBoardData={setBoardData}
                turn={props["turn"]}
                setTurn={props["setTurn"]}
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
//   "selection": [{
//     "piece": "Queen",
//     "origin": [0, 0]
//   }]
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
