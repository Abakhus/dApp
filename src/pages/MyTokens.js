import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";

import './Box.css'
import { abkt } from './contracts/labReport';
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

const MyTokens = () => {

	var [loadingTokens, setLoadingTokens] = useState(false);
	var [tokens, setTokens] = useState([]);
	var [viewingKey, setViewingKey] = useState('');
	var [loading, setLoading] = useState(false);
	var [rdy, setRdy] = useState(false);

	function hasViewingKey() {
		const key = viewingKeyManager.get(abkt.at);
		return typeof key !== "undefined";
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

	const getNftDetail = async (token_list) => {
		const promises = token_list.map(token => {
		//Query each token 
		return abkt.getNftDossier(token,false,true); //
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
			const name = extension.name ? extension.name: "";
			const description = extension.description ? extension.description: "";
			
			return {
				name:  name,
				description:  description,
				image: "",
				trait: trait
			}          
		});
		setTokens(tokens);
	}

	const getTokens = async () =>{
		setLoadingTokens(true);
		try {
			//Get list of tokens' id owned
			// Exam. ["4","65","87"]
			const tokens = await abkt.getTokens(null,null,10,true);
			const token_list = tokens.token_list.tokens;
			console.log("tokens", tokens);
			//Get details of each token
			await getNftDetail(token_list);
		} catch (e) {
			console.error(e)
		} finally {
			setRdy(true);
			setLoadingTokens(false);
		}
	}
	
	useEffect(() => {
		const removeOnAccountAvailable = onAccountAvailable (() => { //setar viewing key caso já exista
			const key = viewingKeyManager.get(abkt.at);
			if(key){
				setViewingKey(key);
			}
		})
		
		return () => {
			removeOnAccountAvailable();
		}
	  }, []);

	const nftInfo = [
		{
			file : "",
			clientName: "",
			birthDate: "",
			nameTest: "",
			nameLab: "",
			genolabTestCode: "", //publico
			deliveryDate: "",    //publico
			labID: "",			 //publico
		},
	];

	

	return (
		<>
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
		<Button onClick = { getTokens } disabled={ !hasViewingKey() } variant="outlined">
				{ loadingTokens ? "Listing Tokens..." : "Get Tokens" } 
		</Button>
		<br></br>
		{ rdy ? <TokenList nftList={tokens} /> : "" }
		</>

	  );
};

export default MyTokens;