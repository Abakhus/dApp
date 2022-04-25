import React, { useState } from "react";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PopupPData from "./PopupPData";

function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            //console.log(item);
            //console.log(key);
            var [alt, setAlt] = useState(150);
            var [pdata, setPdata] = useState(false);

            const popup = async () =>{
                if(pdata){
                    setPdata(false);
                    setAlt(150);
                }else{
                    setPdata(true);
                    setAlt(260);
                }
            }

            return (
                <>
                <br></br>
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
                        Genolab Test Code: { item.trait[0].value }
                    </Typography>
                    <Typography variant="h5" component="p">
                        Delivery Date: { item.trait[2].value }
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
                        color="black"
                        component="det"
                    >
                        {pdata ? "Client Name: "+item.privateExtension[1].value : ""}<br></br>
                        {pdata ? "Test Name: "+item.privateExtension[2].value : ""}<br></br>
                        {pdata ? "File URL: "+item.privateExtension[3].value : ""}
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
