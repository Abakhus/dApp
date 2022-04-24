import React, { useState, useEffect } from 'react';
import {
	bootstrap,
	onAccountAvailable,
	viewingKeyManager,
  } from '@stakeordie/griptape.js';

import Button from "@material-ui/core/Button";
import { abkt } from './contracts/labReport'
import { create } from 'ipfs-http-client'

const Home = () => {
	const [isConnected, setIsConnected] = useState(false);
	var [viewingKey, setViewingKey] = useState('');

	const connectWalletHandler = async () => {
		try{
			setIsConnected(true);
			bootstrap();
			console.log(isConnected)
		}
		catch(err){
			console.log(err);
		}
	}

	const connectWalletButton = () => {
		return (
		<button onClick={ connectWalletHandler } className='cta-button connect-wallet-button'>
			Connect
		</button>
		)
	}

	useEffect(() => {
		const removeOnAccountAvailable = onAccountAvailable (() => { //setar viewing key caso já exista
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


	return (
		<div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			alignItems: 'Top',
			height: '100vh'
		}}
		className='main-app'>
			<div className='main-app'>
				<div>
				<Button variant="contained" onClick={ connectWalletHandler } disabled={isConnected} className='cta-button connect-wallet-button'>
					{isConnected ? "Wallet Set" : "Connect Wallet"}
				</Button>
				</div>
	   		</div>
		</div>
		
	);
};

export default Home;
