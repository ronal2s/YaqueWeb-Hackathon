import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './utils/i18n.tsx';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:500&display=swap" />
    
      {/* <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link> */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
