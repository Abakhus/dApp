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
	var [viewingKey, setViewingKey] = useState('');
	const [currentAccount, setCurrentAccount] = useState(null);
	var [loading, setLoading] = useState(false);

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


	const connectWalletHandler = async () => {
		try{
			bootstrap();
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

	const mintNftButton = () => {
		if(hasViewingKey()){
			return (
				<div>
					<p>You already have a Viewing Key.</p>
					<p>Contract address: {abkt.at}</p>
				</div>
			)
		}else {
			return (
				<button onClick={createViewingKey} disabled={hasViewingKey()} className='cta-button mint-nft-button'>
					{loading ? "Loading" : "Create Viewing Key"}
				</button>
				)
		}
	
	}

	useEffect(() => {
		const removeOnAccountAvailable = onAccountAvailable (() => {
			const key = viewingKeyManager.get(abkt.at);
			setIsConnected(true)
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
				{isConnected ? mintNftButton() : connectWalletButton()}
				
				</div>
	   		</div>
		</div>
		
	);
};

export default Home;
