import { Button } from "@mui/material";

function Navbar(props) {
  return (
    <div height="10vh">
      <Button onClick={() => props["setNavbarSelection"]("Queen")}>Queen</Button>
      <Button onClick={() => props["setNavbarSelection"]("Ant")}>Ant</Button>
      <Button onClick={() => props["setNavbarSelection"]("Beetle")}>Beetle</Button>
      <Button onClick={() => props["setNavbarSelection"]("Grasshopper")}>Grasshopper</Button>
      <Button onClick={() => props["setNavbarSelection"]("Spider")}>Spider</Button>
    </div>
  );
}

export default Navbar;
