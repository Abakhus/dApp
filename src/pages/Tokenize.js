import React, { useState, useEffect } from 'react';
import { 
 onAccountAvailable,
 viewingKeyManager,
 } from '@stakeordie/griptape.js';
 import Button from "@material-ui/core/Button";
 import { abkt } from './contracts/labReport';
 import { create } from 'ipfs-http-client'
 import './Popup.css'

/*
Requisitos:
    • Metadados públicos:
        ◦ Código do laboratório.
        ◦ Código do exame (não será o nome do exame, mas um código interno do laboratório).
        ◦ Data da liberação do resultado pelo laboratório (não é, obrigatoriamente, a data da criação do token).
        ◦ URL para a imagem de capa do token, caso exista (exemplo: máquina de PCR, ...).
    • Metadados privados:
        ◦ Nome do cliente do laboratório.
        ◦ URL do laudo do exame (pdf ou imagem).
        ◦ Nome do exame realizado.
    • O token deve possuir a funcionalidade de compartilhamento temporário. Isso significa que o dono do token poderá compartilhar por tempo determinado (horas ou dias) o conteúdo privado para alguma outra carteira.

*/


const Tokenize = () => {
    //private metadata
    var [fileURL, setFileURL] = useState(``);
    var [clientName, setClientName] = useState('');
    var [birthdate, setBirthdate] = useState('');
    var [nameTest, setNameTest] = useState('');

    //public metadata
    var [bgImage, setBgImage] = useState(``);
    var [labID, setLabID] = useState('');
    var [reportID, setReportID] = useState('');
    var [releaseDate, setReleaseDate] = useState('');

    //misc
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
          description: "laboratory",
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