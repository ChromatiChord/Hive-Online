import HexContainer from './HexContainer';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import '../../App.css';
import { useFirstRender } from './FirstRenderCheck';

// ideal number is 23
const board_size = 15;

// values you need to add to the x and y coordinates to move a tile
const traversal_memory = {
  "UP": [0, -2],
  "UP_RIGHT": [1, -1],
  "DOWN_RIGHT": [1, 1],
  "DOWN": [0, 2],
  "DOWN_LEFT": [-1, 1],
  "UP_LEFT": [-1, -1]
}

function createBoard() {
  // construct the board
  let board_data = Array(board_size);
  
  // fills the board the necessary coords with hexes
  // if x AND y are even, or if x AND y are odd,
  // fills that space with hex
  for (let x = 0; x < board_data.length; x++) {
    let y_array = Array(board_size);
    for (let y = 0; y < board_data.length; y++) {
      if ((x % 2 === 0 && y % 2 === 0) || 
      (x % 2 !== 0 && y % 2 !== 0)) {
        y_array[y] = {
          "isHex": true,
          "pieces": []
        };
      } else {
        y_array[y] = {"isHex": false};
      }
    }
    board_data[x] = y_array;
  }

  // debug board data
  const center_coord = (board_size - 1) / 2;
  board_data[center_coord][center_coord - 2]["pieces"].push(["Ant", "black"]);
  board_data[center_coord + 1][center_coord - 1]["pieces"].push(["Queen", "white"]);

  return board_data;
}

function highlightMove(boardData, setBoardData, navbarSelection, turn) {
  const center_coord = (board_size - 1) / 2;
  // first turn logic
  if (turn["colour"] === "white" && turn["counter"] === 1) {
    // place in centre of board
    let board_data_copy = [...boardData];
    board_data_copy[center_coord][center_coord]["pieces"].push([navbarSelection, "white"]);
    setBoardData(board_data_copy);
  } 
  // place adjacent to center of board
  else if (turn["colour"] === "black" && turn["counter"] === 1) {
    console.log(`Turn ${turn["counter"]}, ${turn["colour"]}`);
  }
  // other logic is uniform
  else {
    console.log(`Turn ${turn["counter"]}, ${turn["colour"]}`);
  }
}

function Board(props) {
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  const [boardData, setBoardData] = useState(() => createBoard());
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) highlightMove(boardData, setBoardData, props["navbarSelection"], props["turn"]);
    // if (!firstRender) setBoardData(createBoard());
  }, [props["navbarSelection"]]);

  useEffect(() => {
    if (!firstRender) {
      let activePieceType = boardData[activeSquare["x"]][activeSquare["y"]]["pieces"].at(-1)
      highlightMove(boardData, setBoardData, activePieceType, props["turn"]);
    }
    // if (!firstRender) setBoardData(createBoard());
    
  }, [activeSquare]);

  return (
    <div height="10vh">
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
                :
                ""
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