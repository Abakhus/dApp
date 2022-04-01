import React, { useState, useEffect } from "react";
import {
  bootstrap,
  getAddress,
  onAccountAvailable,
  getNativeCoinBalance,
  coinConvert,
  onAccountChange,
  viewingKeyManager,
  onViewingKeyCreated,
  enablePermit,
  hasPermit

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
  var [vkey, setVKey] = useState('');

  var [isConnected, setIsConnected] = useState(false);
  var [isAccountChanged, setIsAccountChanged] = useState(false);
  var [isMessageLoading, setMessageLoading] = useState(false);
  var [isQueryLoading, setQueryLoading] = useState(false);
  var [isPermit, setIsPermit] = useState(false);

  var [loading, setLoading] = useState(false);
  var [loadingBalance, setLoadingBalance] = useState(false);


  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable (() =>{
      setIsConnected(true);
      hasViewingKey();

      //setIsPermit(hasPermit(abkt));
    });

    const removeOnViewingKeyCreated = onViewingKeyCreated(() => {      
      hasViewingKey();

    });

    return () => {
      removeOnAccountAvailable();
      removeOnViewingKeyCreated();
    }
  }, []);
  
  async function createViewingKey(){
    setMessageLoading(true);
    try{
      const result = await abkt.createViewingKey();
      if(result.isEmpty()) return;      
      const { viewing_key: { key }} = result.parse();     
      viewingKeyManager.add(abkt, key);
    } finally {
      setMessageLoading(false);
      
    }
  }

  async function vKey() {
    if(!hasViewingKey()) return;

    setQueryLoading(true);
    try{
      const pkey = viewingKeyManager.get(abkt.at);
      console.log(pkey);
      setVKey(pkey);
    } finally {
      setMessageLoading(false);
    }
  }


  function hasViewingKey(){
    const key = viewingKeyManager.get(abkt.at);
    return typeof key !== "undefined";
  }

  
  const getBalance = async () => {

    setLoadingBalance(true)
    if (!hasPermit(abkt)) return;

    const amount = await abkt.getBalance();
    const balance = coinConvert(amount.balance.amount, 6, 'human');
    setCoins(balance);
    setLoadingBalance(false);
  }

  const createPermit = async () => {

    setLoading(true);
    try {
      await enablePermit(abkt, ["balance"]);
      setIsPermit(hasPermit(abkt));
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  /*


  async function createViewingKey() {
    setMessageLoading(true);

    try{
      const result = await abkt.createViewingKey();
      if(result.isEmpty()) return;
      const { viewing_key: { key } } = result.parse();
      viewingKeyManager.add(abkt, key);
      console.log(key)
      
    } finally {
      setMessageLoading(false);
    }
  }

  function hasViewingKey() {
    const key = viewingKeyManager.get(abkt.at);
    console.log(key);
    return typeof key !== "undefined";
  }

  const createViewingKey = async () =>{

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
  }

  const getBalance = async () => {
   const key = viewingKeyManager.get(abkt.at);
   if (!key) return;
   const amount = await abkt.getBalance();
   const balance = coinConvert(amount.balance.amount, 6, 'human');
   setCoins(balance);
  }*/

  return (
    <>

      <h1>ABK Core</h1>
      <Componente size={"20"}/>
      <p>Is connected? { isConnected ? "Yes": "No" }</p>
      <p>Has Viewing Key? {hasViewingKey() ? "Yes": "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <button
        onClick={() => { vKey(); }}
        disabled={!hasViewingKey()}>Show Viewing Key
      </button>
      <button
        onClick={() => createViewingKey()}
        disabled={
            isMessageLoading
          || hasViewingKey()
          || !isConnected
        }
      >
        Create Viewing Key
      </button>
      <p>{hasViewingKey() ? "Viewing Key " : ""}</p>
    </>
  );
}
export default App;
