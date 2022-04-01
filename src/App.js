import React, { useState, useEffect } from "react";
import {
  bootstrap,
  getAddress,
  onAccountAvailable,
  getNativeCoinBalance,
  coinConvert,
  onAccountChange,
  viewingKeyManager,

} from '@stakeordie/griptape.js';
import { abkt } from "./contracts/labReport"
import { Componente } from "./component";

function App() {
  // React app 
  // UseStat('') inicialização vazio
  var [address, setAddress] = useState(''); //UseState ele seta a variavel. 1 valor (ultimo valor setado) 2 valor (valor )
  var [coins, setCoins] = useState(undefined);
  var [isConnected, setIsConnected] = useState(false);
  var [tokens, setTokens] = useState([]);
  var [isAccountChanged, setIsAccountChanged] = useState(false);


  useEffect(() => {
   /* const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      setAddress(getAddress());
      getBalance();
    })

    return ()=>{
      removeOnAccountAvailable()
    }
    */
    const removeAccountAvailableListener = onAccountAvailable (() =>{
      setIsConnected(true);
      const key = viewingKeyManager.get(abkt.at);
      if(key){
        setViewingKey(key);
        getBalance();
      }
    });

    const removeAccountChangeListener = onAccountChange(() => {
      alert("You have changed your account, please refresh.");
      setIsAccountChanged(false);
    });

    return ()=> {
      removeAccountAvailableListener();
      removeAccountChangeListener();
    }//*/
  }, []);




  const getBalance = async () => {
    var balance = await getNativeCoinBalance();
    balance = coinConvert(balance, 6, 'human');
    setCoins(balance);
  }

  return (
    <>

      <h1>Hello, Griptape!</h1>
      <Componente size={"20"}/>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <p>Your address is: {address}</p>
      <p>Your balance is: {coins}</p>
      <p>Your minted tokens:</p>
    </>
  );
}
export default App;
