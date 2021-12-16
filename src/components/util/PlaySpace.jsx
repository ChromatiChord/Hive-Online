import { useState } from 'react';
import BoardContainer from './BoardContainer'
import Navbar from './Navbar'
import { Typography } from '@mui/material';

function PlaySpace() {
  const [turn, setTurn] = useState({"counter": 1, "colour": "white"})
  const [navbarSelection, setNavbarSelection] = useState(["None", "None"]);

  return (
    <>
      <center>
        <Typography 
        variant="h2"
        sx={{
          fontFamily: "Roboto",
          margin: "14px"
        }}
        >
          Turn {turn["counter"]}, {turn["colour"].charAt(0).toUpperCase() + turn["colour"].slice(1)}
        </Typography>
        <BoardContainer {...{navbarSelection, turn, setTurn}} />
        <Navbar {...{navbarSelection, setNavbarSelection, turn}}/>
      </center>
    </>
  );
}

export default PlaySpace;