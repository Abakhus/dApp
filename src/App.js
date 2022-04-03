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
import TokenList from "./components/TokenList"

function App() {

  var [address, setAddress] = useState(''); 
  var [coins, setCoins] = useState(undefined);
  var [tokens, setTokens] = useState([]);
  var [balance, setBalance] = useState("");


  var [isAccountChanged, setIsAccountChanged] = useState(false);
  var [isMessageLoading, setMessageLoading] = useState(false);
  var [isQueryLoading, setQueryLoading] = useState(false);
  var [isPermit, setIsPermit] = useState(false);
  var [loadingBalance, setLoadingBalance] = useState(false);
  //token vars
  var [name, setName] = useState("");
  var [birthdate, setBirthdate] = useState("");
  var [labID, setLabID] = useState("");

  //Mint Vars
  var [loading, setLoading] = useState(false);
  var [loadingMint, setLoadingMint] = useState(false);
  var [loadingTokens, setLoadingTokens] = useState(false);
  var [viewingKey, setViewingKey] = useState('');
  var [nftList, setNftList] = useState([]);
  var [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable (() => {
      setIsConnected(true);
      const key = viewingKeyManager.get(abkt.at);
      if(key){
        setViewingKey(key);
      }
    })
    return () => {
      removeOnAccountAvailable();
    }
  }, []);

  function hasViewingKey() {
    const key = viewingKeyManager.get(abkt.at);
    return typeof key !== "undefined";
  }

  const getTokens = async () => {
    setLoadingTokens(true);
    try {
      const tokens = await abkt.getTokens(null,null,20,true);
      console.log(tokens)
      const token_list = tokens.token_list.tokens;
      await getNftDetail(token_list);
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingTokens(false);
    }
  }
  
  const getNftDetail = async (token_list) => {
    //abkt.setGlobalApproval(8, 'all', 'all');
    const promises = token_list.map(token => {
      return abkt.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const tokens = result
      .map((ele) => {
          const { nft_dossier:{ public_metadata } }= ele
          console.log(ele);
          if(!public_metadata || !public_metadata.extension){
            return {
              name:  "",
              description:  "",
              image: ""
            }
          }
          //console.log(public_metadata);
          const { extension } = public_metadata;
          const trait = extension.attributes ? extension.attributes: "";
          //console.log(trait[1].value);
          const name = extension.name ? extension.name: "";
          const description = extension.description ? extension.description: "";
          const image = extension.image ? extension.image: "https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU";
          return {
            name:  name,
            description:  description,
            image: "",
            trait: trait
          }          
      });
      
    setNftList(tokens);
  }


  const mint = async () => {
    var date = Date.now(); 
    const extension = {
      name: `Attribute ${date}`,
      description: "Attribute Test 22",
      image: 'https://i.picsum.photos/id/586/200/300.jpg?hmac=Ugf94OPRVzdbHxLu5sunf4PTa53u3gDVzdsh5jFCwQE',
      attributes: [{
        "trait_type": "birthdate",
        "value": `${birthdate}`
      },{
        "trait_type": "client_name",
        "value": `${name}`
      },{
        "trait_type": "lab_id",
        "value": `${labID}`
      },{
        "trait_type": "file",
        "value": ""
      }]
    }
    setLoadingMint(true);
    try {
      //console.log(extension + "Extension");
      await abkt.mintNft(null,null,{extension});
    } catch (e) {
      // ignore for now
    } finally {
      setLoadingMint(false);
    }
  }

  const createViewingKey = async () => {
    setLoading(true);
    try {
      const result = await abkt.createViewingKey();
      if (result.isEmpty()) return;

      const { viewing_key: { key } } = result.parse();
      viewingKeyManager.add(abkt, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(abkt.at);

      if (currentKey) {
        viewingKeyManager.set(abkt, key);
      } else {
        viewingKeyManager.add(abkt, key);
      }
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Abk Core</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <p>Has Viewing Key? {hasViewingKey() ? "Yes": "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <p></p>
      <hr></hr>
      <form>
        <label>Enter your name:  
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Enter your birthdate:  
          <input
            type="text" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Lab ID:  
          <input
            type="text" 
            value={labID}
            onChange={(e) => setLabID(e.target.value)}
          />
        </label>
      </form>
      <button disabled={!isConnected} onClick={() => { mint(); }}>{loadingMint ? 'Loading...' : 'Mint'}</button>  
      <hr></hr>
      <br></br>
      <br></br>
      
      <br></br>
      <button disabled={!isConnected} onClick={() => { createViewingKey(); }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button disabled={!isConnected || !viewingKey}  onClick={() => { getTokens(); }}>{loadingTokens ? 'Loading...' : 'Get Tokens'}</button>
      <br></br>
      <TokenList nftList={nftList} />
    </>
  );
}
export default App;
