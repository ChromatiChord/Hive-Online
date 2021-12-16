import { borderRadius } from '@mui/system';
import Board from './Board'

const container_style = {
  border: "1px solid grey", 
  height: "70vh", 
  width: "80vw", 
  borderRadius: "15px", 
  marginTop: "10px",
  overflow: "auto",
  backgroundColor: "white"
}

function BoardContainer(props) {
  return (
    <div style={container_style}>
      <Board {...props}/>
    </div>
  );
}

export default BoardContainer;
