import './App.css';
import { useState } from 'react';
import BoardContainer from './components/util/BoardContainer'
import Navbar from './components/util/Navbar'

function Game() {
  const [turn, setTurn] = useState({"counter": 1, "colour": "white"})
  const [navbarSelection, setNavbarSelection] = useState(["None", "None"]);

  return (
    <>
      <center>
        <BoardContainer {...{navbarSelection, turn, setTurn}} />
        Turn {turn["counter"]}, {turn["colour"]}
        <Navbar {...{navbarSelection, setNavbarSelection, turn}}/>
      </center>
    </>
  );
}

export default Game;