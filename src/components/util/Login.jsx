import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';


function Login(props) {

  const navigate = useNavigate();
  function launchGame(setIsLogged) {
    setIsLogged(true)
    navigate("/play");
  }

  return (
    <center>
      <Typography 
      variant="h2"
      sx={{
        fontFamily: "Roboto",
        margin: "14px",
        marginTop: "15%"
      }}
      >Hive Local</Typography> 
      <Typography
      sx={{
        fontFamily: "Roboto"
      }}
      > Web version of the board game: Hive Carbon.
      </Typography>
      <br/>
      <Button variant="outlined" onClick={() => launchGame(props["setIsLogged"])}>Launch Game</Button>
    </center>
  )
}

export default Login;
