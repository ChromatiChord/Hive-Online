import { Button, Grid } from "@mui/material";
import { useFirstRender } from '../logic/FirstRenderCheck';
import { useState, useEffect } from 'react';
import AntWhite from '../../assets/pieces/AntWhite.png'
import AntBlack from '../../assets/pieces/AntBlack.png'
import BeetleWhite from '../../assets/pieces/BeetleWhite.png'
import BeetleBlack from '../../assets/pieces/BeetleBlack.png'
import GrassWhite from '../../assets/pieces/GrassWhite.png'
import GrassBlack from '../../assets/pieces/GrassBlack.png'
import QueenWhite from '../../assets/pieces/QueenWhite.png'
import QueenBlack from '../../assets/pieces/QueenBlack.png'
import SpiderWhite from '../../assets/pieces/SpiderWhite.png'
import SpiderBlack from '../../assets/pieces/SpiderBlack.png'

const navbar_styling = {
  backgroundColor: "#e3e3e3",
  borderRadius: "5px",
  height: "15vh",
  width: "96vw"
}

const pieces = ["Ant", "Beetle", "Grasshopper", "Spider", "Queen"];

function getCorrectIcon(icon, colour, setNavSelect, blackPieceCount, whitePieceCount) {
  let icon_img;
  switch(icon) {
    case "Ant":
      icon_img = colour === "white" ? AntWhite : AntBlack;
      break;
    case "Beetle":
      icon_img = colour === "white" ? BeetleWhite : BeetleBlack;
      break;
    case "Grasshopper":
      icon_img = colour === "white" ? GrassWhite : GrassBlack;
      break;
    case "Spider":
      icon_img = colour === "white" ? SpiderWhite : SpiderBlack;
      break;
    case "Queen":
      icon_img = colour === "white" ? QueenWhite : QueenBlack;
      break;
    default:
      icon_img = SpiderWhite;
  }
  const img_style = {
    pointerEvents: (colour === "white" ? (whitePieceCount[icon] <= 0 ? "none" : "auto") : (blackPieceCount[icon] <= 0 ? "none" : "auto")),
    opacity: (colour === "white" ? (whitePieceCount[icon] <= 0 ? "0.3" : "1") : (blackPieceCount[icon] <= 0 ? "0.3" : "1"))
  }
  return <img src={icon_img} style={img_style} onClick={() => setNavSelect([icon, colour])}/>
}

function Navbar(props) {
  let active_colour = props["turn"]["colour"];
  const [blackPieceCount, setBlackPieceCount] = useState({
    "Ant": 3,
    "Beetle": 2,
    "Grasshopper": 3,
    "Spider": 2,
    "Queen": 1
  })
  const [whitePieceCount, setWhitePieceCount] = useState({
    "Ant": 3,
    "Beetle": 2,
    "Grasshopper": 3,
    "Spider": 2,
    "Queen": 1
  })

  const firstRender = useFirstRender();
  useEffect(() => {
    if (!firstRender) {
      // getPotentialHexes(boardData, props["navbarSelection"], props["turn"], []);
      let cur_selection = props["navbarSelection"];
      if (JSON.stringify(cur_selection) !== JSON.stringify(["None", "None"])) {
        if (active_colour === "black") { 
          let wpc = {...whitePieceCount}
          console.log(wpc)
          wpc[cur_selection[0]] = wpc[cur_selection[0]] - 1;
          setWhitePieceCount(wpc);
        }
        else { 
          let wpc = {...blackPieceCount}
          wpc[cur_selection[0]] = wpc[cur_selection[0]] - 1;
          setBlackPieceCount(wpc);
        }
        props["setNavbarSelection"](["None", "None"]);
      }
      console.log("TURNED!");
      console.log(whitePieceCount);
      console.log(blackPieceCount);
    }
  }, [props["turn"]]);

  return (
    <div style={navbar_styling}>
      <Grid container spacing={2}>
      {pieces.map(icon => 
        <Grid item xs={2.4} key={icon}>
          {getCorrectIcon(icon, active_colour, props["setNavbarSelection"], blackPieceCount, whitePieceCount)}
          {active_colour === "white" ? whitePieceCount[icon] : blackPieceCount[icon]}
        </Grid>
      )}
      </Grid>
    </div>
  );
}

export default Navbar;
