import React, { useState, useEffect } from "react";
import {
  bootstrap,
  getAddress,
  onAccountAvailable,
  getNativeCoinBalance,
  coinConvert,
  onAccountChange,
  viewingKeyManager,
  viewingKeyManager

} from '@stakeordie/griptape.js';
import { abkt } from "./contracts/labReport"
import { Componente } from "./component";

function App() {
  // React app 
  // UseStat('') inicialização vazio
  var [address, setAddress] = useState(''); //UseState ele seta a variavel. 1 valor (ultimo valor setado) 2 valor (valor )
  var [coins, setCoins] = useState(undefined);
  var [tokens, setTokens] = useState([]);
  var [balance, setBalance] = useState("");

  var [isConnected, setIsConnected] = useState(false);
  var [isAccountChanged, setIsAccountChanged] = useState(false);
  var [isMessageLoading, setMessageLoading] = useState(false);
  var [isQueryLoading, setQueryLoading] = useState(false);

  var [haveViewKey, setViewKey] = useState(false);
  var [viewingKey, setViewingKey] = useState('');
  var [loading, setLoading] = useState(false);

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable (() =>{
      setIsConnected(true);
      hasViewingKey();
      /*/const key = viewingKeyManager.get(abkt.at); //Get actual viewing key
      if(key){
        setViewingKey(key);
        getBalance();
      }*/
    });

    const removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      hasViewingKey();
    });

    return () => {
      removeOnAccountAvailable();
      removeOnViewingKeyCreated();
    }
  }, []);

  async function createViewingKey() {
    setMessageLoading(true);

    try{
      const result = await abkt.createViewingKey();
      if(result.isEmpty()) return;
      const { create_viewing_key: { key } } = result.parse();
      viewingKeyManager.add(abkt, key);
      
    } finally {
      setMessageLoading(false);
    }
  }

  function hasViewingKey() {
    const key = viewingKeyManager.get(abkt.at);
    return typeof key !== "undefined";
  }

  async function getBalance(){
    if (!hasViewingKey()) return;
    setQueryLoading
  }


  /*const createViewingKey = async () =>{

    setLoading(true);
    try{
      const result = await abkt.createViewingKey();
      
      if (result.isEmpty()) return;

      const { create_viewing_key: { key } } = result.parse();
      viewingKeyManager.add(abkt, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(abkt.at);

      if(currentKey) {
        viewingKeyManager.set(abkt, key);
      } else {
        viewingKeyManager.add(abkt, key);
      }
    
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }*/

  const getBalance = async () => {
   const key = viewingKeyManager.get(abkt.at);
   if (!key) return;
   const amount = await abkt.getBalance();
   const balance = coinConvert(amount.balance.amount, 6, 'human');
   setCoins(balance);
  }

  return (
    <>

      <h1>Hello, Griptape!</h1>
      <Componente size={"20"}/>
      <p>Viewing Key exists? {haveViewKey ? "Yes" : "No"}</p>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <p>Your minted tokens:</p>
      <p>Your balance is: {coins}</p>
      <button disabled={!isConnected} onClick={() => { createViewingKey(); }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button hidden={isAccountChanged} onClick={() => { window.location.reload(); }}>Refresh</button>
    </>
  );
}
export default App;
