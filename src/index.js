// import node_modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// import components and css
import './index.css';
import App from './App';

// import Redux store
import store from './redux/store';

// render the App component on UI
ReactDOM.render(
  // Wrap entire app with Redux provider for using Store at anywhere
  // Wrap entire app with React Router Dom for using Router
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);