import React, { useState, useEffect } from "react";

export const Componente = (props) =>{
    console.log(props.size);
    return <div> Component Testing { props.size } </div>;
}

//Tentar implementar getTokens utilizando um componente diferente. 