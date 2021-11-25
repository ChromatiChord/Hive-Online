import styled from 'styled-components';
import BlankHex from '../../assets/BlankHex.png'
import GreenHex from '../../assets/GreenHex.png'


function works(coordinates, setActiveSquare, activeSquare) {
  console.log(`Hex: [${coordinates["x"]}, ${coordinates["y"]}]`);
  console.log(activeSquare)
  let new_coords = {"x": coordinates["x"], "y": coordinates["y"]};
  console.log(new_coords)
  setActiveSquare(new_coords)
}

function HexContainer(props) {
  const coordinates = props["coordinates"];
  return (
    <img src={
      coordinates !== props["activeSquare"] ? 
      BlankHex : 
      GreenHex} 
      width="110px" 
      onClick={() => works(coordinates, props["setActiveSquare"], props["activeSquare"])}/>
  );
}

export default HexContainer;
