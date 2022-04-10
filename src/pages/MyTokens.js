import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import "./Box.css";
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'

const MyTokens = () => {
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
	
	const renderCard = (card, index) => {
		
		return (		
		<CCard style={{ width: '18rem' }}>
			<CCardImage orientation="top" src="/images/react.jpg" />
			<CCardBody>
				<CCardTitle>Card title</CCardTitle>
				<CCardText>
				Some quick example text to build on the card title and make up the bulk of the card's content.
				</CCardText>
				<CButton href="#">Go somewhere</CButton>
			</CCardBody>
		</CCard>
		)
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
	
	  return (		
		<div>{cardT.map(renderCard)}</div>	
	);
	  
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