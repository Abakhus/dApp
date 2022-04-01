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
  hasPermit,
  MintingModule

} from '@stakeordie/griptape.js';
import { abkt } from "./contracts/labReport"
import { Componente } from "./component";
import TokenList from "./components/TokenList"
import { promises } from "stream";

function App() {

  var [address, setAddress] = useState(''); //UseState ele seta a variavel. 1 valor (ultimo valor setado) 2 valor (valor )
  var [coins, setCoins] = useState(undefined);
  var [tokens, setTokens] = useState([]);
  var [balance, setBalance] = useState("");


  var [isAccountChanged, setIsAccountChanged] = useState(false);
  var [isMessageLoading, setMessageLoading] = useState(false);
  var [isQueryLoading, setQueryLoading] = useState(false);
  var [isPermit, setIsPermit] = useState(false);
  
  //Mint Vars
  var [isConnected, setIsConnected] = useState(false);

  var [loading, setLoading] = useState(false);
  var [loadingMint, setLoadingMint] = useState(false);
  var [loadingTokens, setLoadingTokens] = useState(false);
  var [loadingBalance, setLoadingBalance] = useState(false);
  
  var [nftList, setNftList] = useState('');
  var [viewingKey, setViewingKey] = useState('');


  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable (() =>{
      setIsConnected(true);
      const key = viewingKeyManager.get(abkt.at);
      if(key){
        setViewingKey(key);
        console.log(key);
      }
    })

    return () => {
      removeOnAccountAvailable();
    }
  }, []);

  const getTokens = async () => {
    setLoadingTokens(true);
    try{
      const tokens = await abkt.getTokens(null,null,10,true);
      console.log(tokens);
      const token_list = tokens.token_list.tokens;
      await getNftDetail(token_list);
      
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTokens(false);
    }
  }
  
  const getNftDetail = async (token_list) => {
    const promises = token_list.map(token => {
      return abkt.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const tokens = result
      .map((ele) => {
          const { nft_dossier:{ public_metadata } }= ele
          if(!public_metadata || !public_metadata.extension){
            return {
              name:  "",
              description:  "",
              image: ""
            }
          }
          const { extension } = public_metadata;
          const name = extension.name ? extension.name: "";
          const description = extension.description ? extension.description: "";
          const image = extension.image ? extension.image: "https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU";
          return {
            name:  name,
            description:  description,
            image: image
          }          
      });
      
    setNftList(tokens);
  }




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
        onClick={() => createViewingKey()}
        disabled={
            isMessageLoading
          || hasViewingKey()
          || !isConnected
        }
      >
        Create Viewing Key
      </button>
      
    </>
  );
}
export default App;
