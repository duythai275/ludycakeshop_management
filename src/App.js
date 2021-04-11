// import node_modules
import React, { useState } from 'react';

// import css
import './App.css';

// import components
import Login from './components/login/login.component';
import Mainpage from './components/mainpage/mainpage.component';

// import React context
import AccessContext from './contexts/access.context';

/**
 * This component returns UI for the first page
 * @returns App component
 */
function App() {
  // Use state for checking authentication and managing URL
  const [token, setToken] = useState(undefined);
  const [url, setUrl] = useState(undefined);

  // function to handle URL and Token for entire app
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
    </div>
  );
}

export default App;
