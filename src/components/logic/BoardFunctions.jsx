// ideal number is 23
export const board_size = 15;

export const traversal_memory = {
  "UP": [0, -2],
  "UP_RIGHT": [1, -1],
  "DOWN_RIGHT": [1, 1],
  "DOWN": [0, 2],
  "DOWN_LEFT": [-1, 1],
  "UP_LEFT": [-1, -1]
}

export function createBoard() {
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

export function getPotentialHexes(boardData, pieceType, turn, origin) {
  const center_coord = (board_size - 1) / 2;
  // first turn logic
  if (turn["colour"] === "white" && turn["counter"] === 1) {
    console.log([center_coord, center_coord])
    return [[center_coord, center_coord]];
  } 
  // place adjacent to center of board
  else if (turn["colour"] === "black" && turn["counter"] === 1) {
    let return_coords = [];
    for (const direction in traversal_memory) {
      let adjacent_coordinates = [center_coord + traversal_memory[direction][0], center_coord + traversal_memory[direction][1]]
      return_coords.push(adjacent_coordinates)
    }
    console.log(return_coords);
    return return_coords;
  }
  // other logic is uniform
  else {
    console.log(`Funky Stuff`);
    return [[center_coord, center_coord]];
  }
}