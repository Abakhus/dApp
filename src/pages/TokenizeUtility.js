/* 

Requisitos:
    Metadados públicos:
        Nome do serviço.
        Descrição do serviço.
        Tipo: Laboratorial ou Análise genômica.
        Data de validade do utility (essa data deverá estar no voucher).
        URL para o logotipo da empresa que está disponibilizando o utility.
        URL para a capa do token.
        Preço.
    Metadados privados:
        URL para o Voucher do serviço. 

*/
import { 
    onAccountAvailable,
    viewingKeyManager,
    } from '@stakeordie/griptape.js';
  import React, { useState, useEffect } from "react";
  import { create } from 'ipfs-http-client'
  import './Popup.css'
  import Button from "@material-ui/core/Button";
  
  //importando o contrato específico pra o mint da token
  import { utility } from './contracts/UtilityToken'
  
  const TokenizeUtility = () => {
  
      //misc 
      var [loadingMint, setLoadingMint] = useState(false);
      var [isConnected, setIsConnected] = useState(false);
      const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
      var [fileStatus, setFileStatus] = useState(false);
      var [viewingKey, setViewingKey] = useState('');
  
      //public metadata
      var [bgImage, setBgImage] = useState(``);
      var [serviceName, setServiceName] = useState('');
      var [serviceDescription, setServiceDescription] = useState('');
      var [serviceType, setServiceType] = useState('');
      var [expireDate, setExpireDate] = useState('');
      var [logoURL, setLogoURL] = useState('');
      var [price, setPrice] = useState('');
      //private metadata
      var [fileURL, setFileURL] = useState(``);
  
      useEffect(() =>{
        const removeOnAccountAvailable = onAccountAvailable (() => {
            setIsConnected(true);
            const key = viewingKeyManager.get(utility.at);
            if(key){
              setViewingKey(key);
            }
          })
          return () => {
            removeOnAccountAvailable();
          }
    }, []);
  
      //token minting function 
      const mint = async () => {
          var date = Date.now(); 
          const extension = {
            //public metadata
              name: "",
              //by setting a description defining the token type, we can use as a conditional parameter to further logic.
              description: "utility",
              image: "",
              attributes: [
              {
                "trait_type": "service_name",
                "value": `${serviceName}`
              },
              {
                "trait_type": "service_description",
                "value": `${serviceDescription}`
              },
              {
                "trait_type": "service_type",
                "value": `${serviceType}`
              },
              {
                "trait_type": "expire_date",
                "value": `${expireDate}`
              },
              {
                "trait_type": "logo_url",
                "value": `${logoURL}`
              },
              {
                "trait_type": "token_price",
                "value": `${price}`
              }
           ] 
          }
          //private metadata
          const private_metadata = {
            extension : {
              attributes: [{              
                "trait_type": "file",
                "value": `${fileURL}`
              }]
            }
          }
          //minting 
          setLoadingMint(true);
          try {
            await utility.mintNft(null,null,{extension}, private_metadata );
          } catch (e) {
            //how to behave when minting fails?
          } finally {
            setLoadingMint(false);
          }
      }
  
      //function to upload a file to IPFS
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
          <strong>Mint Utility Token</strong>
          <hr></hr>
        <form>
          <fieldset>
            <p>Public Metadata:</p>
          <form>
          <label>Service Name:   
            <input
              type="text" 
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Service description:  
            <input
              type="text" 
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Service Type:  
            <input
              type="text" 
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Expire Date:  
            <input
              type="text" 
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </label>
        </form>
         <form>
          <label>Logo URL:  
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
          <label>Voucher File:  
            <input
              type="file"
              onChange={ipfsUpload}
            />
          </label>
        </form>
        </fieldset>
      </form>
      <br></br>
      <form>
        <fieldset>
          <p>Token Price: </p>
        <form>
          <label>Value in SCRT:  
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </form>
        </fieldset>
      </form>
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
  export default TokenizeUtility;