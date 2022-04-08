import React, { useState, useEffect } from 'react';
import {
	bootstrap,
	getAddress,
	onAccountAvailable,
	getNativeCoinBalance,
	coinConvert,
	onAccountChange,
	viewingKeyManager,
	onViewingKeyCreated,
	enablePermit,
	hasPermit,
	MintingModule

  } from '@stakeordie/griptape.js';

import { abkt } from './contracts/labReport'
import { create } from 'ipfs-http-client'

const Home = () => {
	var [isConnected, setIsConnected] = useState(false);
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
		  console.log(result);
		  console.log("try")
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
			bootstrap()
			setIsConnected(true)
		}
		catch(err){
			console.log(err)
		}
	}

	const mintNftHandler = () => { }

	const connectWalletButton = () => {
		return (
		<button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
			{isConnected ? "Connected" : "Connect Wallet"}
		</button>
		)
	}

	const mintNftButton = () => {
		return (
		<button onClick={createViewingKey} className='cta-button mint-nft-button'>
			{loading ? "Loading" : "Create Viewing Key"}
		</button>
		)
	}

	useEffect(() => {
		const removeOnAccountAvailable = onAccountAvailable (() => {
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
		<h4>Connect to Keplr Wallet</h4>
			<div className='main-app'>
		 		<h1>Abakhus</h1>
				<div>
				{isConnected ? mintNftButton() : connectWalletButton()}
				<br></br>
				{hasViewingKey() ? "Have viewing key" : "No viewing key created" }
				</div>
	   		</div>
		</div>
		
	);
};

export default Home;
