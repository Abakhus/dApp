import React, { useState, useEffect } from 'react';
import {
	bootstrap,
	onAccountAvailable,
	viewingKeyManager,
  } from '@stakeordie/griptape.js';

import Button from "@material-ui/core/Button";
import { abkt } from './contracts/labReport'

const Home = () => {
	const [isConnected, setIsConnected] = useState(false);
	var [viewingKey, setViewingKey] = useState('');

	const connectWalletHandler = async () => {
		try{
			setIsConnected(true);
			bootstrap();
		}
		catch(err){
			setIsConnected(false);
			console.log(err);
		}
	}

	const connectLocalHost = async () => {
		await window.keplr.experimentalSuggestChain({
			chainId: "secretdev-1",
			chainName: "abkTestChain",
			rpc: "http://20.226.15.33:26657",
			rest: "http://20.226.15.33:1317",
			bip44: {
			  coinType: 529,
			},
			bech32Config: {
			  bech32PrefixAccAddr: "secret",
			  bech32PrefixAccPub: "secretpub",
			  bech32PrefixValAddr: "secretvaloper",
			  bech32PrefixValPub: "secretvaloperpub",
			  bech32PrefixConsAddr: "secretvalcons",
			  bech32PrefixConsPub: "secretvalconspub",
			},
			currencies: [
			  {
				coinDenom: "SCRT",
				coinMinimalDenom: "uscrt",
				coinDecimals: 6,
				coinGeckoId: "secret",
			  },
			],
			feeCurrencies: [
			  {
				coinDenom: "SCRT",
				coinMinimalDenom: "uscrt",
				coinDecimals: 6,
				coinGeckoId: "secret",
			  },
			],
			stakeCurrency: {
			  coinDenom: "SCRT",
			  coinMinimalDenom: "uscrt",
			  coinDecimals: 6,
			  coinGeckoId: "secret",
			},
			coinType: 529,
			gasPriceStep: {
			  low: 0.1,
			  average: 0.25,
			  high: 1,
			},
			features: ["secretwasm", "stargate", "ibc-transfer", "ibc-go"],
		  });
	}

	const connectPulsarTestnet = async () => {
		await window.keplr.experimentalSuggestChain({
			chainId: "pulsar-2",
			chainName: "Pulsar-2",
			rpc: "http://testnet.securesecrets.org:26657",
			rest: "http://testnet.securesecrets.org:1317",
			bip44: {
			  coinType: 529,
			},
			bech32Config: {
			  bech32PrefixAccAddr: "secret",
			  bech32PrefixAccPub: "secretpub",
			  bech32PrefixValAddr: "secretvaloper",
			  bech32PrefixValPub: "secretvaloperpub",
			  bech32PrefixConsAddr: "secretvalcons",
			  bech32PrefixConsPub: "secretvalconspub",
			},
			currencies: [
			  {
				coinDenom: "SCRT",
				coinMinimalDenom: "uscrt",
				coinDecimals: 6,
				coinGeckoId: "secret",
			  },
			],
			feeCurrencies: [
			  {
				coinDenom: "SCRT",
				coinMinimalDenom: "uscrt",
				coinDecimals: 6,
				coinGeckoId: "secret",
			  },
			],
			stakeCurrency: {
			  coinDenom: "SCRT",
			  coinMinimalDenom: "uscrt",
			  coinDecimals: 6,
			  coinGeckoId: "secret",
			},
			coinType: 529,
			gasPriceStep: {
			  low: 0.1,
			  average: 0.25,
			  high: 1,
			},
			features: ["secretwasm", "stargate", "ibc-transfer", "ibc-go"],
		  });
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
			height: '100vh',
		}}
		className='main-app'>
			<div className='main-app'>
				<div>
				<Button variant="contained" onClick={ connectWalletHandler } disabled={isConnected} className='cta-button connect-wallet-button'>
					{isConnected ? "Wallet Set" : "Connect Wallet"}
				</Button>
				<br></br>
				<br></br>
				<div style={ { gap: 20, display: "flex" }   }>
				<Button variant="contained" onClick={ connectPulsarTestnet } disabled={isConnected} className='cta-button connect-wallet-button'>
					Add Testnet [Pulsar 2]
				</Button>
				
				<Button variant="contained" onClick={ connectLocalHost } disabled={isConnected} className='cta-button connect-wallet-button'>
					Add Testnet [Local Testnet]
				</Button>
				</div>
				</div>
	   		</div>
		</div>
		
	);
};

export default Home;
