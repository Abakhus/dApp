import React from "react";

function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            //console.log(item);
            //console.log(key);
            return (
                <div key={key}>
                    <div>{item.image ? <img src={item.image} alt={item.image}></img> : <img src="https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU" alt="default"></img>}</div>
                    <div>Token Name: {item.name}</div>
                    <div>Token Description: {item.description}</div>
                    <div>Birthdate: {item.trait[0].value}</div>
                    <div>Client Name: {item.trait[1].value}</div>
                    <div>Lab ID: {item.trait[2].value}</div>
                    <div>File: {item.trait[3].value}</div>
                </div>
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
