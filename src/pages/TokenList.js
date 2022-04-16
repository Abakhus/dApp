import React from "react";

function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            console.log(item);
            console.log(key);
            return (
                <>
                <div key={key}>
                    <div>Client Name: { item.name }</div>
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
