import React from 'react';
import './App.css';

import Login from './components/login/login.component';
import Mainpage from './components/mainpage/mainpage.component';

function App() {
  return (
    <div className="App">
      <Mainpage />
      {/* <Login /> */}
    </div>
  );
}

export default App;
