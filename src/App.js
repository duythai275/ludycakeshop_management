import React, { useContext, useState } from 'react';
// import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/login/login.component';
import Mainpage from './components/mainpage/mainpage.component';

import AccessContext from './contexts/access.context';

function App() {
  const [token, setToken] = useState(undefined);
  const [url, setUrl] = useState(undefined);
  const handleLogIn = ( newUrl, newToken ) => {
    setUrl(newUrl);
    setToken(newToken);
  };

  return (
    <div className="App">
      <AccessContext.Provider value={{ url, token, handleLogIn }}>
        {
          ( token === undefined ) ? <Login /> : <Mainpage /> 
        }
      </AccessContext.Provider>
      {/* <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/management" component={Mainpage} />
      </Switch> */}
    </div>
  );
}

export default App;
