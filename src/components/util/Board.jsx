import HexContainer from './HexContainer';
import { Grid, Button } from '@mui/material'
import { useState } from 'react';
import '../../App.css';

let setStateActiveSquare;

function setBetterState(state) {
  console.log("Here")
  setStateActiveSquare(state)
}


function createBoard(activeSquare, setActiveSquare) {
  // construct the board
  const board_size = 15;
  let board_data = Array(board_size);

  // fills the board the necessary coords with hexes
  // if x AND y are even, fill space with hex
  // if x AND y are odd, fill space with hex
  for (let x = 0; x < board_data.length; x++) {
    let y_array = Array(board_size);
    for (let y = 0; y < board_data.length; y++) {
      if ((x % 2 == 0 && y % 2 == 0) || 
      (x % 2 != 0 && y % 2 != 0)) {
        let coordinates = {"x": x, "y": y} 
        y_array[y] = <HexContainer {...{coordinates, activeSquare, setActiveSquare}}/>;
      } else {
        y_array[y] = "";
      }
    }
    board_data[x] = y_array;
  }
  return board_data;
}

function Board(activePiece, activePlayer, setActivePlayer) {
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  setStateActiveSquare = setActiveSquare;

  const [boardData, setBoardData] = useState(createBoard(activeSquare, setBetterState));
  console.log(activeSquare)

  return (
    <>
    <table>
        {boardData[0].map((_, x) => 
          <tr>
            {boardData.map(y => 
                <td>{y[x]}</td>
            )}
          </tr>
        )}
    </table>
    <Button onClick={() => setBetterState({"x": -2, "y": -2})}>Heelo</Button>
    </>
  );
}

export default Board;
