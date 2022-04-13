import React, { useState, useEffect } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import './Box.css'
import { abkt } from './contracts/labReport';

// return minting.getNftDossier(token,false,true);  retornar os dados da token por completo


const MyTokens = () => {

var [loadingTokens, setLoadingTokens] = useState(false);
var [tokens, setTokens] = useState([]);

const getNftDetail = async (token_list) => {
	const promises = token_list.map(token => {
	  //Query each token 
	  return abkt.getNftDossier(token,false,true); //
	});
	
	const result = await Promise.all(promises);
	console.log(result);
	// console.log('result: ', result);
	setTokens = result.map((ele, idx) => {
	  ele['nft_dossier']['index'] = `${token_list[idx]}`;
	  return ele['nft_dossier'];
	});
  }

	const getTokens = async () =>{
		setLoadingTokens(true);
			try {
			//Get list of tokens' id owned
			// Exam. ["4","65","87"]
			const tokens = await abkt.getTokens(null,null,10,true);
			const token_list = tokens.token_list.tokens;
			console.log(tokens);
			//Get details of each token
			await getNftDetail(token_list);
		} catch (e) {
			console.error(e)
		} finally {
			setLoadingTokens(false);
		}
	}
	
	useEffect(() => {
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

	const cardT = [
		{
			image:
			  "https://i.pinimg.com/originals/03/ce/01/03ce015ea85dc84a17fb4c24a96cd87e.jpg",
			title: "Michael Jordan",
			text: "Sample Text 1",
		  },
		  {
			image:
			  "https://www.insidehook.com/wp-content/uploads/2020/03/steph-curry-nba-jam-e1583192954848.jpg?fit=734%2C488",
			title: "Steph Curry",
			text: "Sample txt 2",
		  },
	]


	

	return (
		<div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			alignItems: 'Top',
			height: '100vh'
		}}>
		  <Card
		  style={{
			width: 400,
			height: 200,
			backgroundColor: "grey",
		  }}
		  >
			<CardContent>
			  <Typography
				style={{ fontSize: 14 }}
				color="textSecondary"
				gutterBottom
			  >
				Genolab Test Code
			  </Typography>
			  <Typography variant="h5" component="h2">
				Delivery Date
			  </Typography>
			  <Typography
				style={{
				  marginBottom: 12,
				}}
				color="textSecondary"
			  >
				.
			  </Typography>
			  <Typography variant="body2" component="p">
				.
			  </Typography>
			</CardContent>
			<CardActions>
			  <Button 
			  onClick={() => { getTokens(); } } 
			  size="small">Private Data</Button>
			</CardActions>
		  </Card>
		</div>
	  );
};

export default MyTokens;