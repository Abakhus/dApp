import React, { useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { onAccountAvailable } from '@stakeordie/griptape.js';
import { Link as RouterLink } from "react-router-dom";
//adicionar navegação dos contratos



const Navbar = () => {
	var [isConnected, setIsConnected] = useState(false);
	onAccountAvailable(() => {
		setIsConnected(true);
	});	
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
		<NavLink to='/MyTokens' activeStyle>
			<h3>My Tokens</h3>
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		
		{!isConnected && 
		<>	
			<NavBtn>
			<NavBtnLink to='#'> <WalletIcon style={{ height: 28, width: 42, margin: -8}}/> <strong>Connect Keplr Wallet</strong></NavBtnLink>
			</NavBtn>
		</>
		}
		{isConnected && 
		<>		
			<NavBtn>
				<NavBtnLink to='#'> <WalletIcon style={{ height: 28, width: 42, margin: -8}}/> <strong>Keplr is Connected</strong></NavBtnLink>
			</NavBtn>
		</>
		}
		
	</Nav>
	</>
);
};

export default Navbar;
