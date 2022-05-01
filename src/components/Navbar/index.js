import React, { useEffect, useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { onAccountAvailable, getAddress, bech32 } from '@stakeordie/griptape.js';
import { Link as RouterLink } from "react-router-dom";

//adicionar navegação dos contratos



const Navbar = () => {
	var [isConnected, setIsConnected] = useState(false);
	var [address, setAddress] = useState('');

	useEffect(() =>{
		const acc = onAccountAvailable(() => {
			setIsConnected(true);
			setAddress(getAddress());
		});
		return () => {
			acc();
		}
	}, []);


return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/Marketplace' activeStyle>
			<h3>Marketplace</h3>
		</NavLink>
		<NavLink to='/TokenizeIndex' activeStyle>
			<h3>Tokenize</h3>
		</NavLink>
		<NavLink to='/MyTokensIndex' activeStyle>
			<h3>My Tokens</h3>
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		
		{!isConnected && 
		<>	
			<NavBtn>
			<NavBtnLink to='/'> <WalletIcon style={{ height: 22, width: 35, margin: -5 }}/>Connect Keplr Wallet</NavBtnLink>
			</NavBtn>
		</>
		}
		{isConnected && 
		<>		
			<NavBtn>
				<NavBtnLink to='#'> <WalletIcon style={{ height: 22, width: 35, margin: -5 }}/> {bech32(address, 16)} </NavBtnLink>
			</NavBtn>
			
		</>
		}
		
	</Nav>
	</>
);
};

export default Navbar;
