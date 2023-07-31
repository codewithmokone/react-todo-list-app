import { useState } from 'react';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [isLoggedIn, setUserState] = useState(false);

  return (
    <div className="App">
      {/* <Home /> */}
      <Router>
          <Routes>
            <Route path='/' element={ isLoggedIn ? <Home /> : <Navigate to="/login"/> } />
            <Route path='/login/' element={ !isLoggedIn ? <Login setUserState={setUserState} name="redirect" /> : <Navigate to="/home"/> } />
            <Route path='/register' element={ <Registration /> } />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
