import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            console.log(item);
            console.log(key);
            return (
                <>
                <br></br>
                <div key={key}>
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
                        Genolab Test Code: { item.trait[1].value }
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Delivery Date: { item.trait[0].value }
                    </Typography>
                    <Typography
                        style={{
                        marginBottom: 12,
                        }}
                        color="textSecondary"
                    >
                        
                    </Typography>
                    <Typography variant="body2" component="p">
                        Lab ID: { item.trait[2].value }
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button
                    variant="contained"
                    onClick={() => {  } } 
                    size="big">+</Button>
                    </CardActions>
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
