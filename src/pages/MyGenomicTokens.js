import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";

import './Box.css'
import { genomic } from './contracts/AnalisysReport';
import {
	onAccountAvailable,
	viewingKeyManager,
  } from '@stakeordie/griptape.js';
import TokenList from "./TokenList";

// return minting.getNftDossier(token,false,true);  retornar os dados da token por completo
// Private Metadata deve aparecer pelo botão +
// Ter link p/ arquivo no IPFS | Jackal > abrir numa nova guia
// getTokens // nftDossier -> viewing key = private metadata (toker owner only)
// => Criar aba lateral dos contratos específicos

const MyGenomicTokens = () => {

	var [loadingTokens, setLoadingTokens] = useState(false);
	var [tokens, setTokens] = useState([]);
	var [viewingKey, setViewingKey] = useState('');
	var [loading, setLoading] = useState(false);
	var [rdy, setRdy] = useState(false);

	useEffect(() => {
		const removeOnAccountAvailable = onAccountAvailable (() => { //setar viewing key caso já exista
			const key = viewingKeyManager.get(genomic.at);
			if(key){
				setViewingKey(key);
			}
		})
		return () => {
			removeOnAccountAvailable();
		}
	  }, []);

	function hasViewingKey() {
		const key = viewingKeyManager.get(genomic.at);
		return typeof key !== "undefined";
	}

	const createViewingKey = async () => {
		setLoading(true);
		try {
			const result = await genomic.createViewingKey();
			if (result.isEmpty()) return;
				const { viewing_key: { key } } = result.parse();
				viewingKeyManager.add(genomic, key);
				setViewingKey(key);
				//console.log(key);
				const currentKey = viewingKeyManager.get(genomic.at);
			if (currentKey) {
				viewingKeyManager.set(genomic, key);
			} else {
				viewingKeyManager.add(genomic, key);
			}
		} catch (e) {
			// ignore for now
		} finally {
			setLoading(false);
		}
	}

	const getNftDetail = async (token_list) => {
		const promises = token_list.map(token => {
		//Query each token 
		return genomic.getNftDossier(token,false,true); //
		});
		
		const result = await Promise.all(promises);
		const tokens = result
		.map((ele) => {
			const { nft_dossier: { private_metadata, public_metadata } }= ele
			//console.log("ELEMENT")
			console.log(ele);
			if(!public_metadata || !public_metadata.extension){
				return {
					name:  "",
					description:  "",
					image: ""
				}
			}
		
			const { extension } = public_metadata;
			const trait = extension.attributes ? extension.attributes: "";
			const name = extension.name ? extension.name: "";
			const description = extension.description ? extension.description: "";
			
			
			
			const privateExtension = private_metadata.extension.attributes;
			//console.log(exs);
			//const ptrait = private_extension.attributes;
			return {
				name:  name,
				description:  description,
				image: "",
				trait: trait,
				privateExtension: privateExtension,

			}          
		});
		setTokens(tokens);
	}

	const getTokens = async () =>{
		setLoadingTokens(true);
		try {
			//Get list of tokens' id owned
			// Exam. ["4","65","87"]
			const tokens = await genomic.getTokens(null,null,10,true);
			const token_list = tokens.token_list.tokens;
			//console.log("tokens", tokens);
			//Get details of each token
			await getNftDetail(token_list);
		} catch (e) {
			console.error(e)
		} finally {
			setRdy(true);
			setLoadingTokens(false);
		}
	}
	

	return (
		<>
        <br></br>
        <div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			height: '100'
		}}>
            <h3>Genomic Report Tokens</h3>
        </div>
		<br></br>
		<div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			height: '100'
		}}>
			<Button onClick = { createViewingKey } variant="outlined" disabled={ hasViewingKey() }>
				 { hasViewingKey() ? "Viewing Key Already Set" : (loading ? "Creating ..." : "Create Viewing Key") }
			</Button>
		</div>
		<br></br>
		<div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			height: '100'
		}}>
		<Button onClick = { getTokens } disabled = { !hasViewingKey() } variant="outlined">
				{ loadingTokens ? "Listing Tokens..." : "Get Tokens" } 
		</Button>
		<br></br>
		</div>
		<div className='wrapper'>
			<div className='box'>
				{ rdy ? <TokenList nftList={tokens} /> : "" }
			</div>
		</div>
		
		</>

	  );
};

export default MyGenomicTokens;