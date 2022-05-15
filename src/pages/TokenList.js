import React, { useState } from "react";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useLocation } from 'react-router-dom';

function TokenList({ nftList }, tokenType='') {

    function mapTokens() {

        const location = useLocation();
        console.log(location.pathname);

        

        return nftList.map((item,key) => {
            //console.log(item);
            //console.log(key);
            var [alt, setAlt] = useState(150);
            var [pdata, setPdata] = useState(false);
            //console.log(item.description)
            //console.log(tokenType.value)
            //setTokenType(item.description);

            const genomicToken = {
                reportID : "",
                labID : "",
                releaseDate : "",
                relatoryURL : ""
            }            
            
            const popup = async () =>{
                if(pdata){
                    setPdata(false);
                    setAlt(150);
                }else{
                    setPdata(true);
                    setAlt(240);
                }
            }


            //pra leitura de forma generica das tokens, fazer o parse pelo tipo
            // laboratory, genomic, dataBase, pipeline, utility
            if(tokenType = "laboratory"){
               
            }else if(tokenType = "genomic"){

            }else if(tokenType = "dataBase"){
               
            }else if(tokenType = "pipeline"){

            }else{

            }
            
                function ListItem(props) {
                 // Correct! There is no need to specify the key here:
                    return <li>{props.value}</li>;
                }

                function NumberList(props) {
                    const numbers = props.numbers;
                    const listItems = numbers.map((number) =>
                        // Correct! Key should be specified inside the array.
                        <ListItem key={number.toString()} value={number} />
                );

                return (
                    <ul>
                    {listItems}
                    </ul>
                );
                }

            function RenderPData(){
                var datas = [];
                for(var i = 0; i < item.trait.length; i++){
                    datas[i] = 
                    <Typography style={{ fontSize: 16 }}
                    color="textPrimary"
                    gutterBottom
                    variant="body2"
                    >
                               <strong>{ item.trait[i].trait_type }</strong>: { item.trait[i].value }
                    </Typography>             
                }

                return (
                    <div>
                        {console.log(datas.values)}
                        {datas.map((nft) =>
                        nft
                        )}
                    </div>
                )
                
                
            }
            
            function PublicMetadata(){
                
                return(
                    <>
                    {  /*console.log(item.trait.length) --> quantidade de metadados publicos*/}
                    {  /*console.log(item.privateExtension.length) --> quantidade de metadados privados*/}

                    <div>
                        <NftCard>                                           
                            <RenderPData/>
                        </NftCard>
                    </div>
                    </>
                )
            }


            function NftCard(props){
                return (                    
                    <div key={key}>
                        <Card>
                            <CardContent>
                                {props.children}key={key}
                            </CardContent>
                        </Card>
                    </div>                    
                )
            }

            function PrintD() {
                return(
                <div key={key}>
                <Card
                style={{
                    width: 430,
                    height: alt,
                }}
                >
                    <CardContent>
                    <Typography
                        style={{ fontSize: 14 }}
                        color="textSecondary"
                        gutterBottom
                    >
                        Test ID: { item.trait[0].value }
                    </Typography>
                    <Typography variant="h5" component="p">
                        Available Date: { item.trait[2].value }
                    </Typography>
                    <Typography variant="body2" component="p">
                        Lab ID: { item.trait[1].value }
                    </Typography>
                    <CardActions>                    
                    <Button
                    variant="contained"
                    gutterBottom
                    onClick={() => { popup() } } 
                    size="medium">{pdata ? "-": "+"}</Button>
                    </CardActions>
                    <Typography
                        component="det"
                    >
                        {pdata ? "Client Name: "+item.privateExtension[1].value : ""}<br></br>
                        {pdata ? "Test Name: "+item.privateExtension[2].value : ""}<br></br>
                        {pdata &&
                        <>
                        <a target="_blank" href ={item.privateExtension[3].value}>File</a>
                        </>
                        }
                    </Typography>
                    </CardContent>
                </Card>
                  <br></br>
                </div>                          
                )
            }

            return (
                <>
                {item.description == "laboratory" && location.pathname == "/MyTokens" &&
                 <PublicMetadata />
                }
                {item.description == "genomic" && location.pathname == "/MyGenomicTokens" &&
                 <PublicMetadata />
                }

              </>
            );
        });
    }

    return (
        <>
            {mapTokens()}
        </>
    )
}
export default TokenList;
