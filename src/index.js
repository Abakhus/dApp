import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

//caso for usar a pulsar-2 mudar a restUrl pra umas das 3 opções
const restUrl = 'http://20.226.15.33:1317/';
//http://testnet.securesecrets.org:1317/
//https://api.pulsar.griptapejs.com
//https://rpc.pulsar.griptapejs.com:443/
//http://20.226.15.33:1317/'
const provider = getKeplrAccountProvider();

function runApp() {

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
}

gripApp(restUrl, provider, runApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
