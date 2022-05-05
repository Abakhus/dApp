/* 

Metadados públicos:
    Nome do código/pipeline.
    Descrição do código/pipeline.
    URL do artigo que publicou o código/pipeline, caso exista. 
    Tipo: código ou pipeline. 
    Se o tipo for código, Linguagem de Programação: python, java, c/c++, ruby, perl, outras.
    Plataforma: windows, linux, max, windows ou mac, windows ou linux, linux ou max, todas.
    Preço.
Metadados privados:
    Arquivo do código ou do pipeline (qualquer formato)
    Descrição de como usar o código ou pipeline, caso exista.
    A imagem de capa do token será fixa (uma imagem de código).
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
      var [pipeline, setPipeline] = useState('');
      var [pipelineDescription, setPipelineDescription] = useState('');
      var [articleURL, setArticleURL] = useState('');
      var [tokenType, setTokenType] = useState('');
      var [tokenOS, setTokenOS] = useState('');
      var [price, setPrice] = useState('');
      var [royaltie, setRoyaltie] = useState('');
      //private metadata
      var [fileURL, setFileURL] = useState(``);
      var [tokenUseDescription, setTokenUseDescription] = useState(``);
  
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
              description: "pipeline",
              image: "",
              attributes: [
              {
                "trait_type": "pipeline_name",
                "value": `${pipeline}`
              },
              {
                "trait_type": "pipeline_description",
                "value": `${pipelineDescription}`
              },
              {
                "trait_type": "article_url",
                "value": `${articleURL}`
              },
              {
                "trait_type": "token_type",
                "value": `${tokenType}`
              },
              {
                "trait_type": "token_os",
                "value": `${tokenOS}`
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
              },{
                "trait_type": "token_use_description",
                "value": `${tokenUseDescription}`
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
          <label>Pipeline/Code Name:   
            <input
              type="text" 
              value={pipeline}
              onChange={(e) => setPipeline(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Pipeline/Code description:  
            <input
              type="text" 
              value={pipelineDescription}
              onChange={(e) => setPipelineDescription(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Article URL [optional]:  
            <input
              type="text" 
              value={articleURL}
              onChange={(e) => setArticleURL(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Token Type [Code | Pipeline]:  
            <input
              type="text" 
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Token OS [win/linux]:  
            <input
              type="text" 
              value={tokenOS}
              onChange={(e) => setTokenOS(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Token Price:  
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
          <label>File Upload:  
            <input
             type="file"
             onChange={ipfsUpload}
            />
          </label>
        </form>
        <form>
          <label>Use Instructions:  
            <input
             type="text"
             onChange={(e) => setTokenUseDescription(e.target.value)}
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