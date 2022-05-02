/* 
Requisitos:
    • Metadados públicos:
        ◦ Código da empresa de análise.
        ◦ Código do relatório (não será o nome do exame, mas um código interno da empresa de análise).
        ◦ Data da liberação do relatório (não é, obrigatoriamente, a data da criação do token).
        ◦ URL para a imagem de capa do relatório, caso exista.
    • Metadados privados:
        ◦ URL do relatório (pdf).

Token para disponibilizar o relatório de análises genômicas
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
import { genomic } from './contracts/AnalisysReport'

const TokenizeAnalisys = () => {

    //misc 
    var [loadingMint, setLoadingMint] = useState(false);
    var [isConnected, setIsConnected] = useState(false);
    const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
    var [fileStatus, setFileStatus] = useState(false);
    var [viewingKey, setViewingKey] = useState('');

    //public metadata
    var [bgImage, setBgImage] = useState(``);
    var [labID, setLabID] = useState('');
    var [reportID, setReportID] = useState('');
    var [releaseDate, setReleaseDate] = useState('');
    //private metadata
    var [fileURL, setFileURL] = useState(``);

    useEffect(() =>{
      const removeOnAccountAvailable = onAccountAvailable (() => {
          setIsConnected(true);
          const key = viewingKeyManager.get(genomic.at);
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
            description: "genomic",
            image: "",
            attributes: [
            {
              "trait_type": "report_id",
              "value": `${reportID}`
            },
            {
              "trait_type": "lab_id",
              "value": `${labID}`
            },
            {
              "trait_type": "release_date",
              "value": `${releaseDate}`
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
          await genomic.mintNft(null,null,{extension}, private_metadata );
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
        <strong>Mint Genomic Analisys Token</strong>
        <hr></hr>
      <form>
        <fieldset>
          <p>Public Metadata:</p>
        <form>
        <label>Laboratory ID:   
          <input
            type="text" 
            value={labID}
            onChange={(e) => setLabID(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Report ID:  
          <input
            type="text" 
            value={reportID}
            onChange={(e) => setReportID(e.target.value)}
          />
        </label>
      </form>
      <form>
        <label>Release Date:  
          <input
            type="text" 
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
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
        <label>Report File:  
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
export default TokenizeAnalisys;