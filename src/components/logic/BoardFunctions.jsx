import Graph from "graph-data-structure";

// ideal number is ~23
export const board_size = 19;
const center_coord = (board_size - 1) / 2;

export const traversal_memory = {
  "UP": [0, -2],
  "UP_RIGHT": [1, -1],
  "DOWN_RIGHT": [1, 1],
  "DOWN": [0, 2],
  "DOWN_LEFT": [-1, 1],
  "UP_LEFT": [-1, -1]
}

let empty_hex_graph = Graph()

// increments the turn by one
function incrementTurn(turn, setTurn) {
  let return_turn = {...turn};
  const counter = return_turn["counter"];
  const colour = return_turn["colour"];

  return_turn["counter"] = colour === "black" ? counter + 1 : counter;
  return_turn["colour"] = colour === "black" ? "white" : "black";
  setTurn(return_turn);
}

// array coordinates of hexes that have a selection overlay on them
export let selection_hexes = []


// creates the inital blank board
export function createBoard() {
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
          "selection": []
        };
        empty_hex_graph.addNode(`[${x},${y}]`);
      } else {
        y_array[y] = {"isHex": false};
      }
    }
    board_data[x] = y_array;
  }
  // connects all nodes to their edges
  for (let x = 0; x < board_data.length; x++) {
    for (let y = 0; y < board_data.length; y++) {
      for (const direction in traversal_memory) {
        const adjacent_x = x + traversal_memory[direction][0];
        const adjacent_y = y + traversal_memory[direction][1];
        if (!(adjacent_x < 0 || adjacent_x >= board_size || adjacent_y < 0 || adjacent_y >= board_size)) {
          empty_hex_graph.addEdge(`[${x},${y}]`, `[${adjacent_x},${adjacent_y}]`);
        }
      }
    }
  }
  return board_data;
}

// this is the master function where piece movement calculations will occur
// calculates which potential squares a selected piece can move to/be placed on
export function getPotentialHexes(boardData, pieceType, turn, origin) {
  // first turn logic
  if (turn["colour"] === "white" && turn["counter"] === 1) {
    selection_hexes = [[center_coord, center_coord]];
  } 
  // place adjacent to center of board
  else if (turn["colour"] === "black" && turn["counter"] === 1) {
    let return_coords = [];
    for (const direction in traversal_memory) {
      let adjacent_coordinates = [center_coord + traversal_memory[direction][0], center_coord + traversal_memory[direction][1]]
      return_coords.push(adjacent_coordinates)
    }
    selection_hexes = return_coords;
  }
  // PIECE PLACEMENT AND MOVEMENT LOGIC
  else {
    let full_board = [];
    const hexes = empty_hex_graph.nodes();
    // incoming from navbar
    if (origin.length === 0) {
      for (const hex of hexes) {
        const hex_x = parseInt(hex.split(",")[0].substring(1));
        const hex_y = parseInt(hex.split(",")[1].slice(0, -1));
        let white_count = 0;
        let black_count = 0;
        for (const adjacent_hex of empty_hex_graph.adjacent(hex)) {
          const adjacent_hex_x = parseInt(adjacent_hex.split(",")[0].substring(1));
          const adjacent_hex_y = parseInt(adjacent_hex.split(",")[1].slice(0, -1));
          if (boardData[adjacent_hex_x][adjacent_hex_y]["pieces"]?.length !== 0) {
            if (boardData[adjacent_hex_x][adjacent_hex_y]["pieces"]?.at(-1)[1] === "white") {
              white_count += 1;
            } else {
              black_count += 1;
            }
          }
          // if filled
          // get piece colour
        }
        const white_potential = (turn["colour"] === "white" && white_count > 0 && black_count === 0);
        const black_potential = (turn["colour"] === "black" && black_count > 0 && white_count === 0)
        if ((white_potential || black_potential) && boardData[hex_x][hex_y]["pieces"]?.length === 0) {
          full_board.push([hex_x, hex_y]);
        }
      }
    } 
    // moving a piece
    else {
      for (const hex of hexes) {
        const hex_x = parseInt(hex.split(",")[0].substring(1));
        const hex_y = parseInt(hex.split(",")[1].slice(0, -1));
        if (boardData[hex_x][hex_y]["pieces"]?.length !== 0) {
          for (const adjacent_hex of empty_hex_graph.adjacent(hex)) {
            const adjacent_hex_x = parseInt(adjacent_hex.split(",")[0].substring(1));
            const adjacent_hex_y = parseInt(adjacent_hex.split(",")[1].slice(0, -1));
            if (boardData[adjacent_hex_x][adjacent_hex_y]["pieces"]?.length === 0 || pieceType[0] === "Beetle") {
              // check it wouldn't break the hive
              full_board.indexOf([adjacent_hex_x, adjacent_hex_y]) === -1 && full_board.push([adjacent_hex_x, adjacent_hex_y])
            }
          }
        }
      }
    }
    selection_hexes = full_board;
  }
}

// removes all selection hexes from the board
function clearSelectionHexes(boardData, setBoardData) {
  let board_data_copy = [...boardData];
  for (const coordinates of selection_hexes){
    board_data_copy[coordinates[0]][coordinates[1]]["selection"] = [];
  }

  setBoardData(board_data_copy);
}

// places selection hexes on the board according to selection_hexes
export function placePotentialHexes(boardData, setBoardData, pieceType, origin) {
  clearSelectionHexes(boardData, setBoardData);
  let board_copy = [...boardData];
  for (const coordinates of selection_hexes){
    board_copy[coordinates[0]][coordinates[1]]["selection"].push({
      "piece": pieceType,
      "origin": origin
    })
  }
  setBoardData(board_copy);
}

// is called when the player confirms they wish to place
// a hex on a selection tile
export function placeHex(coords, selectionData, boardData, setBoardData, turn, setTurn) {
  let board_data_copy = [...boardData];
  let origin = selectionData["origin"];
  let piece = selectionData["piece"];
  clearSelectionHexes(boardData, setBoardData);
  // remove topmost piece from origin if it's not empty
  if (JSON.stringify(origin) != JSON.stringify([-1, -1])) {
    board_data_copy[origin[0]][origin[1]]["pieces"].pop();
  } 
  // place new piece at coords
  board_data_copy[coords["x"]][coords["y"]]["pieces"].push(piece);
  setBoardData(board_data_copy);
  incrementTurn(turn, setTurn);
}




// CODE GRAVEYARD


// for (let x = 0; x < board_size; x++) {  
//   for (let y = 0; y < board_size; y++) {
//     if (!(boardData[x][y]["pieces"]?.length !== 0)) {
//       full_board.push([x, y]);
//     }
//   }
// }  


// for (let x = 0; x < board_size; x++) {  
//   for (let y = 0; y < board_size; y++) {
//     if (!(pieceType[0] !== "Beetle" && boardData[x][y]["pieces"]?.length !== 0)) {
//       full_board.push([x, y]);
//     }
//   }
// }  