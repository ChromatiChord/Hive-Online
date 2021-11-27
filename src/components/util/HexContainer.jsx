import styled from 'styled-components';
import BlankHex from '../../assets/BlankHex.png'
import GreenHex from '../../assets/GreenHex.png'
import AntWhite from '../../assets/pieces/AntWhite.png'


function works(coordinates, setActiveSquare, activeSquare) {
  console.log(`Hex: [${coordinates["x"]}, ${coordinates["y"]}]`);
  console.log(activeSquare);
  let new_coords = {"x": coordinates["x"], "y": coordinates["y"]};
  setActiveSquare(new_coords, activeSquare)
  console.log(activeSquare);
}

function HexContainer(props) {
  const coordinates = props["coordinates"];
  let temp_state = {...props["activeSquare"]}
  return (
    <img src={
      coordinates !== temp_state ? 
      AntWhite : 
      GreenHex} 
      width="50px" 
      draggable="false"
      onClick={() => works(coordinates, props["setActiveSquare"], props["activeSquare"])}/>
  );
}

export default HexContainer;
