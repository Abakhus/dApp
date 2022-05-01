import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from 'react';
import './Popup.css'
import { Link } from "react-router-dom";


const MyTokensIndex = () => {
//Genomic & Lab Report
    return(
        <>
        <br></br>
       <div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			height: '100',
            gap: 20
            
		}}>
			<Button variant="outlined" component={Link} to="/MyTokens" >
				 Laboratory Report
			</Button>
            
            <Button variant="outlined" component={Link} to="/MyGenomicTokens" >
				 Genomic Report
			</Button>
		</div>
        </>
    )

}

export default MyTokensIndex;