import React, { useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import { onAccountAvailable } from '@stakeordie/griptape.js';
//adicionar navegação dos contratos

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/Marketplace' activeStyle>
			Marketplace
		</NavLink>
		<NavLink to='/TokenizeIndex' activeStyle>
			Tokenize
		</NavLink>
		<NavLink to='/MyTokens' activeStyle>
			My Tokens
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/'>Connect Wallet</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
