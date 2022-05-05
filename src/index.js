import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

<<<<<<< HEAD
const restUrl = 'http://testnet.securesecrets.org:1317/';
=======
const restUrl = 'http://testnet.securesecrets.org:1317';
>>>>>>> a936916d5a638394ee65a9a87d73a41a078da128
//http://testnet.securesecrets.org:1317/
//https://api.pulsar.griptapejs.com
//https://rpc.pulsar.griptapejs.com:443/

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
