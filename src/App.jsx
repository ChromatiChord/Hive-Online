import './App.css';
import { useState } from 'react';
import BoardContainer from './components/util/BoardContainer'
import Navbar from './components/util/Navbar'
import { Button } from '@mui/material';

// this will go somewhere else eventually
function incrementTurn(turn, setTurn) {
  let return_turn = {...turn};
  const counter = return_turn["counter"];
  const colour = return_turn["colour"];

  return_turn["counter"] = colour === "black" ? counter + 1 : counter;
  return_turn["colour"] = colour === "black" ? "white" : "black";
  setTurn(return_turn);
}

function App() {
  const [turn, setTurn] = useState({"counter": 1, "colour": "white"})
  const [navbarSelection, setNavbarSelection] = useState("None");

  return (
    <>
      <BoardContainer {...{navbarSelection, turn, setTurn}} />
      <Navbar {...{navbarSelection, setNavbarSelection, turn}}/>
      <Button onClick={() => incrementTurn(turn, setTurn)}>Increment Turn</Button>
      Turn {turn["counter"]}, {turn["colour"]}
    </>
  );
}

export default App;