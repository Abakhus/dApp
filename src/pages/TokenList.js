import React, { useState } from "react";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            //console.log(item);
            //console.log(key);
            var [alt, setAlt] = useState(150);
            var [pdata, setPdata] = useState(false);
            var [tokenType, setTokenType] = useState('');
            console.log(item.description)

            const genomicToken = {
                reportID : "",
                labID : "",
                releaseDate : "",
                relatoryURL : ""
            }

            

            if(item.description = "genomic"){
                const genomicToken = { 
                    reportID=`${item.trait[1].value}` 
                    
                }
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

            return (
                <>
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
