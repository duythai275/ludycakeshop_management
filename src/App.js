import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/login/login.component';
import Mainpage from './components/mainpage/mainpage.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route path="/" component={Mainpage} />
      </Switch>
      {/* <Mainpage /> */}
    </div>
  );
}

export default App;
