import React, { useState, useEffect } from 'react';
import { 
 onAccountAvailable,
 viewingKeyManager,
 } from '@stakeordie/griptape.js';
 import Button from "@material-ui/core/Button";
 import { abkt } from './contracts/labReport';
 import { create } from 'ipfs-http-client'
 import './Popup.css'

const Tokenize = () => {
    var [fileURL, setFileURL] = useState(``);
    var [clientName, setClientName] = useState('');
    var [birthdate, setBirthdate] = useState('');
    var [nameTest, setNameTest] = useState('');
    var [testID, setTestID] = useState('');  //publico
    var [availableDate, setAvailableDate] = useState('');       //publico
    var [labID, setLabID] = useState('');                    //publico
    var [fileStatus, setFileStatus] = useState(false);
    var [imageURL, setImageURL] = useState('');

    //
    var [viewingKey, setViewingKey] = useState('');
    var [loadingMint, setLoadingMint] = useState(false);
    var [isConnected, setIsConnected] = useState(false);
    const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');

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
              "trait_type": "test_id",
              "value": `${testID}`
            },
            {
              "trait_type": "lab_id",
              "value": `${labID}`
            },
            {
              "trait_type": "available_date",
              "value": `${availableDate}`
            } 
         ] 
        }
        const private_metadata = {
          extension : {
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
              "value": `${fileURL}`
            }]
          }
        }
          
        setLoadingMint(true);
        try {
          //console.log(extension + "Extension");
          await abkt.mintNft(null,null,{extension}, private_metadata );
        } catch (e) {
          // ignore for now
        } finally {
          setLoadingMint(false);
        }
      }
      async function ipfsUpload(e) {
        const file = e.target.files[0]
        try {
          const added = await ipfsClient.add(file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          //setFile(url);
          console.log(url);
          setFileURL(url);
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  finally {
          setFileStatus(true);
        }
      }

    return (
        <>
        
        <div className='container' >
          <strong>Mint Laudo Laboratorial Token</strong>
          <hr></hr>
        <form>
          <fieldset>
            <p>Public Metadata:</p>
          <form>
          <label>Test ID:   
            <input
              type="text" 
              value={testID}
              onChange={(e) => setTestID(e.target.value)}
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
          <label>Available Date:  
            <input
              type="text" 
              value={availableDate}
              onChange={(e) => setAvailableDate(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Image URL:  
            <input
              type="text" 
              value={fileURL}
              onChange={(e) => setFileURL(e.target.value)}
            />
          </label>
        </form>
        </fieldset>
      </form>
      <form>
        <fieldset>
          <p>Private Metadata: </p>
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
              type="file"
              onChange={ipfsUpload}
            />
          </label>
        </form>
        </fieldset>
      </form>
      <br></br>
      <p>
      <Button variant="contained" onClick={ () => { mint(); } } disabled={ !fileStatus } className='cta-button mint-nft-button'>
        {loadingMint ? 'Minting...' : 'Mint'}
      </Button>
      <br></br>
      {!fileStatus && 
      "Upload a file to mint!" } 
      </p>
      </div>
      </>
    )

}
export default Tokenize;