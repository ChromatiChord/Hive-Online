import HexContainer from './HexContainer';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import '../../App.css';

function createBoard() {
  // construct the board
  const board_size = 15;
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
          "pieces": [],
          "coordinates": {"x": x, "y": y}
        };
      } else {
        y_array[y] = {"isHex": false};
      }
    }
    board_data[x] = y_array;
  }
  return board_data;
}


function Board(props) {  
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  const [boardData, setBoardData] = useState(() => createBoard());

  return (
    <div height="10vh">
      <table>
          {boardData.map((x, index_x) => 
            <tr>
              {x.map((y, index_y) =>
                <td>{y["isHex"] ? 
                <HexContainer coordinates={{"x": index_x, "y": index_y}} activeSquare={activeSquare} setActiveSquare={setActiveSquare}/>
                :
                ""
                }</td>
              )}
            </tr>
          )}
      </table>
      {JSON.stringify(activeSquare)}
    </div>
  );
}

export default Board;


// ☠️ TEMP CODE GRAVEYARD ☠️


  // useEffect(() => {
  //   console.log("START: ");
  //   console.log(activeSquare)
  // }, [activeSquare]);


// let boardData = [
  //   ["a", "b", "c", "d", "e", "f", "g"],
  //   ["a", "b", "c", "d", "e", "f", "g"],
//   ["a", "b", "c", "d", "e", "f", "g"],
//   ["a", "b", "c", "d", "e", "f", "g"],
//   ["a", "b", "c", "d", "e", "f", "g"],
//   ["a", "b", "c", "d", "e", "f", "g"],
//   ["a", "b", "c", "d", "e", "f", "g"]
// ]
// boardData.map((x, index_x) => 
//   x.map((y, index_y) =>
//     y
//   )
// )


// let info = {
//   "isHex": true,
//   "pieces": [("Q", "black"), ("B", "white")],
//   "coordinates": {"x": 0, "y": 0},
// }

// let info = {
//   "isHex": true,
//   "pieces": [],
//   "coordinates": {"x": x, "y": y}
// }