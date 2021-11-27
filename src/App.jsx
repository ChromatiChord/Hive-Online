import './App.css';
import { useState } from 'react';
import BoardContainer from './components/util/BoardContainer'
import Navbar from './components/util/Navbar'

function App() {
  const [activePlayer, setActivePlayer] = useState("white")
  const [activePiece, setActivePiece] = useState("None");

  return (
    <>
      <BoardContainer {...{activePiece, activePlayer, setActivePlayer}} />
    </>
  );
}

export default App;