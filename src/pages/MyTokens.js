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
		<div style={{
			justifyContent: 'Center',
			alignItems: 'Center',
		}}>
		  <h4>How to use CardComponent in ReactJS?</h4>
		  <Card
			style={{
			  width: 400,
			  backgroundColor: "yellow",
			}}
		  >
			<CardContent>
			  <Typography
				style={{ fontSize: 14 }}
				color="textSecondary"
				gutterBottom
			  >
				Greetings of the day
			  </Typography>
			  <Typography variant="h5" component="h2">
				How are you ?
			  </Typography>
			  <Typography
				style={{
				  marginBottom: 12,
				}}
				color="textSecondary"
			  >
				Keep Motivated
			  </Typography>
			  <Typography variant="body2" component="p">
				Stay Happy
			  </Typography>
			</CardContent>
			<CardActions>
			  <Button 
			  onClick={() => { getTokens(); } } 
			  size="small">Stay Safe.....</Button>
			</CardActions>
		  </Card>
		</div>
	  );
	
		/*return (
			<Card style={{ width: "18rem" }} key={index} className="box">
			<Card.Img variant="top" src="holder.js/100px180" src={card.image} />
			<Card.Body>
			  <Card.Title>{card.title}</Card.Title>
			  <Card.Text>{card.text}</Card.Text>
			</Card.Body>
		  </Card>
		);*/
	  
};

export default MyTokens;
/**
 * return (
		<div
		style={{
			display: 'flex',
			justifyContent: 'Center',
			alignItems: 'Top',
			height: '100vh'
		}}
		>
		<h1>My Tokens</h1>
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>Card Title</Card.Title>
				<Card.Text>
				Some quick example text to build on the card title and make up the bulk of
				the card's content.
				</Card.Text>
				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
		</div>
	);
 */