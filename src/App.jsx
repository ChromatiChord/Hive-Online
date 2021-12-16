import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import PlaySpace from './components/util/PlaySpace';
import Login from './components/util/Login';

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  return (
    <Router>      
        <Routes>
          <Route exact path="/" element={<Login {...{setIsLogged}}/>}/>
          <Route path="/play" element={!isLogged ? <Navigate replace to={"/"}/> : <PlaySpace/>}/>
          <Route path="*" element={<Navigate replace to={!isLogged ? "/" : "/play"}/>}/>
        </Routes>
    </Router>
  )
}

export default App;
