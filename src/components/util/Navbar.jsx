import { Button } from "@mui/material";

function Navbar(props) {
  let active_colour = props["turn"]["colour"];
  return (
    <div>
      <Button onClick={() => props["setNavbarSelection"](["Queen", active_colour])}>Queen</Button>
      <Button onClick={() => props["setNavbarSelection"](["Ant", active_colour])}>Ant</Button>
      <Button onClick={() => props["setNavbarSelection"](["Beetle", active_colour])}>Beetle</Button>
      <Button onClick={() => props["setNavbarSelection"](["Grasshopper", active_colour])}>Grasshopper</Button>
      <Button onClick={() => props["setNavbarSelection"](["Spider", active_colour])}>Spider</Button>
    </div>
  );
}

export default Navbar;
