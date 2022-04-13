import React, { useState, useEffect } from 'react';
import {
	bootstrap,
	onAccountAvailable,
	viewingKeyManager,
  } from '@stakeordie/griptape.js';

import { abkt } from './contracts/labReport'
import { create } from 'ipfs-http-client'

const Home = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [currentAccount, setCurrentAccount] = useState(null);
	var [loading, setLoading] = useState(false);

	const connectWalletHandler = async () => {
		try{
			bootstrap();
			setIsConnected(true);
		}
		catch(err){
			console.log(err);
			setIsConnected(false);
		}
	}

	const connectWalletButton = () => {
		return (
		<button onClick={ connectWalletHandler } className='cta-button connect-wallet-button'>
			{isConnected ? "Connected" : "Connect Wallet"}
		</button>
		)
	}

	const buttonUpdate = () => {
		if(isConnected){
			return (
				<div>
					<p>Wallet is OK :)!</p>
				</div>
			)
		}else {
			return(
				<></>
			)
		}
	
	}

	useEffect(() => {
		
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
				{isConnected ? buttonUpdate() : connectWalletButton()}
				
				</div>
	   		</div>
		</div>
		
	);
};

export default Home;
