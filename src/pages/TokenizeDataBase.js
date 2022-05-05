/* 

Requisitos:
	Metadados públicos:
		Nome da base de dados.
		Descrição da base de dados.
		Tamanho da base de dados em megabytes (Mb).
		URL do artigo que publicou a base de dados, caso exista. 
		Tipo da base de dados: nucleotídeo ou aminoácido.
		Formato da base de dados: sequências ou identificadores.
		Preço.
	Metadados privados:
		Arquivo da base de dados (txt, zip ou binário).
		Descrição de como usar a base de dados, caso exista.
		A imagem de capa do token será fixa (uma imagem de banco de dados).

O token deverá conter obrigatoriamente royalties para o(s) criador(es) da base de dados. O percentual será negociado entre a Abakhus (ou equivalente) e o(s) criador(es) da base de dados e será inserido no momento da criação do token.


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
  import { dataBase } from './contracts/Code'
  
  const TokenizeAnalisys = () => {
  
      //misc 
      var [loadingMint, setLoadingMint] = useState(false);
      var [isConnected, setIsConnected] = useState(false);
      const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
      var [fileStatus, setFileStatus] = useState(false);
      var [viewingKey, setViewingKey] = useState('');
  
      //public metadata
      var [bgImage, setBgImage] = useState(``);
      var [dataBase, setDataBase] = useState('');
      var [dbDescription, setDBDescription] = useState('');
      var [dbSize, setDBSize] = useState('');
      var [dbType, setDBType] = useState('');
      var [dbFormat, setDBFormat] = useState('');
      var [price, setPrice] = useState('');
      var [royaltie, setRoyaltie] = useState('');
      //private metadata
      var [fileURL, setFileURL] = useState(``);
  
      useEffect(() =>{
        const removeOnAccountAvailable = onAccountAvailable (() => {
            setIsConnected(true);
            const key = viewingKeyManager.get(dataBase.at);
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
              description: "dataBase",
              image: "",
              attributes: [
              {
                "trait_type": "database_name",
                "value": `${dataBase}`
              },
              {
                "trait_type": "database_description",
                "value": `${dbDescription}`
              },
              {
                "trait_type": "database_size",
                "value": `${dbSize}`
              },
              {
                "trait_type": "database_type",
                "value": `${dbType}`
              },
              {
                "trait_type": "database_format",
                "value": `${dbFormat}`
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
            await dataBase.mintNft(null,null,{extension}, private_metadata );
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
          <strong>Mint dataBase Analisys Token</strong>
          <hr></hr>
        <form>
          <fieldset>
            <p>Public Metadata:</p>
          <form>
          <label>Data Base Name:   
            <input
              type="text" 
              value={dataBase}
              onChange={(e) => setDataBase(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Data Base description:  
            <input
              type="text" 
              value={dbDescription}
              onChange={(e) => setDBDescription(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>DB Size:  
            <input
              type="text" 
              value={dbSize}
              onChange={(e) => setDBSize(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>DB Type:  
            <input
              type="text" 
              value={dbType}
              onChange={(e) => setDBType(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>DB Format:  
            <input
              type="text" 
              value={dbFormat}
              onChange={(e) => setDBFormat(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Token Price SCRT:  
            <input
              type="text" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </form>
        {/* <form>
          <label>Image URL:  
            <input
              type="text" 
              value={fileURL}
              onChange={(e) => setFileURL(e.target.value)}
            />
          </label>
        </form> */}
        </fieldset>
      </form>
      <form>
        <fieldset>
          <p>Private Metadata: </p>
        <form>
          <label>Data Base File:  
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
          <p>Royalties Information: </p>
        <form>
          <label>Royaltie Wallets:  
            <input
              type="text"
              onChange={(e) => setRoyaltie(e.target.value)}
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
  export default TokenizeAnalisys;