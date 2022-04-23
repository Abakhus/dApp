import React, { useState, useEffect } from 'react';
import ContractsNav from './contracts/Navbar/ContractsNav';
import { 
 onAccountAvailable,
 viewingKeyManager,
 }from '@stakeordie/griptape.js';
 import { abkt } from './contracts/labReport';

const Tokenize = () => {
    var [file, setFile] = useState('');
    var [clientName, setClientName] = useState('');
    var [birthdate, setBirthdate] = useState('');
    var [nameTest, setNameTest] = useState('');
    var [nameLab, setNameLab] = useState('');
    var [genolabTestCode, setGenolabTestCode] = useState('');  //publico
    var [deliveryDate, setDeliveryDate] = useState('');       //publico
    var [labID, setLabID] = useState(-1);                    //publico

    //
    var [viewingKey, setViewingKey] = useState('');
    var [loadingMint, setLoadingMint] = useState(false);
    var [isConnected, setIsConnected] = useState(false);

    useEffect(() =>{
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

    const mint = async () => {
        var date = Date.now(); 
        const extension = {
          name: "",
          description: "",
          image: "",
          attributes: [
            {
              "trait_type": "genolab_test_code",
              "value": `${genolabTestCode}`
            },
            {
              "trait_type": "lab_id",
              "value": `${labID}`
            },
            {
              "trait_type": "delivery_date",
              "value": `${deliveryDate}`
            } 
         ] 
        }
        const pMetadata = {
          attributes: [{
            "trait_type": "birthdate",
            "value": `${birthdate}`
          },{
            "trait_type": "client_name",
            "value": `${clientName}`
          },{
            "trait_type": "name_test",
            "value": `${nameTest}`
          },{
            "trait_type": "file",
            "value": `${file}`
          }]
        }
        setLoadingMint(true);
        try {
          //console.log(extension + "Extension");
          await abkt.mintNft(null,null,{extension}, {pMetadata});
        } catch (e) {
          // ignore for now
        } finally {
          setLoadingMint(false);
        }
      }


    return (
        <>
        <ContractsNav />
        Mint
        <form>
        <label>Genolab Test Code:  
          <input
            type="text" 
            value={genolabTestCode}
            onChange={(e) => setGenolabTestCode(e.target.value)}
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
      <form>
        <label>Delivery Date:  
          <input
            type="text" 
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Birthdate:  
          <input
            type="text" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Client Name:  
          <input
            type="text" 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Test Name:  
          <input
            type="text" 
            value={nameTest}
            onChange={(e) => setNameTest(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>File:  
          <input
            type="text" 
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </label>
      </form>
      <button onClick={() => { mint(); }}>{loadingMint ? 'Loading...' : 'Mint'}</button>  
      
        </>
    )

}
export default Tokenize;