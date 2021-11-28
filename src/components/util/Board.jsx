import HexContainer from './HexContainer';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import '../../App.css';

function createBoard(activeSquare, setActiveSquare) {
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
        y_array[y] = <HexContainer coordinates={{"x": x, "y": y}} activeSquare={activeSquare} setActiveSquare={setActiveSquare} key={`[${activeSquare}, ${x}, ${y}]`}/>;
      } else {
        y_array[y] = "";
      }
    }
    board_data[x] = y_array;
  }
  return board_data;
}


function Board(props) {  
  const [activeSquare, setActiveSquare] = useState({"x": -1, "y": -1});
  const [boardData, setBoardData] = useState(() => createBoard(activeSquare, setActiveSquare));
  
  useEffect(() => { 
    setBoardData(createBoard(activeSquare, setActiveSquare));
  }, [activeSquare]);

  return (
    <div height="10vh">
      <table>
          {boardData.map((x, index_x) => 
            <tr key={index_x}>
              {x.map((y, index_y) =>
                <td key={`[${index_x}, ${index_y}]`}>{y}</td>
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


// boardData.map((_, x) => 
//   boardData.map(y => 
//       y[x]
//   )
// )

// <Button onClick={() => setBetterState({"x": -2, "y": -2}, activeSquare)}>SetBetter1</Button>
// <Button onClick={() => setBetterState({"x": -5, "y": -5}, activeSquare)}>SetBetter2</Button>
// <Button onClick={() => console.log(activeSquare)}>Seebetter</Button>