import './App.css';
import { useState } from 'react';
import BoardContainer from './components/util/BoardContainer'
import Navbar from './components/util/Navbar'
import { Grid } from '@mui/material';

function App() {
  const [activePlayer, setActivePlayer] = useState("white")
  const [activePiece, setActivePiece] = useState("None");

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={10}
      >
        <Grid item xs={9}>
          <BoardContainer {...{activePiece, activePlayer, setActivePlayer}} />
        </Grid>
        <Grid item xs={3}>
          <Navbar {...{activePiece, setActivePiece, activePlayer}}/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;