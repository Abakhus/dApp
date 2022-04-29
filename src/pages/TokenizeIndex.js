import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from 'react';
import './Popup.css'

//index contains the choices between contracts(token)
//must have the main choice between Laboratório | Data Science
/*
Laboratório [labReport | Serviços(Utility)]
DataScience [AnalisysReport | Serviços(Utility)] 

*/
const TokenizeIndex = () => {

    var [Laboratories, setLaboratories] = useState(false);
    var [DataScience, setDataScience] = useState(false);

    function labButton() {
        if(Laboratories){
            return(
                <>
                    <div className='sp' >
                        <Button variant="contained"  className='cta-button mint-nft-button'>
                            Laudo
                        </Button>
                        <Button variant="contained"  className='cta-button mint-nft-button'>
                            Serviços
                        </Button>
                    </div>
                </>
            )
        }
    }


    function DataScienceButton() {
        if(DataScience){
            return(
                <>
                    <div className='sp' >                   
                        <Button variant="contained"  className='cta-button mint-nft-button'>
                            Relátorios
                        </Button>
                        <Button variant="contained"  className='cta-button mint-nft-button'>
                            Serviços
                        </Button>
                    </div>
                </>
            )
        }
    }

    const LaboratoriesButtonHandler = async () =>{
        setLaboratories(true);
    }

    return(
        <>
        <div className='sp' >
            {!Laboratories && !DataScience &&
            <>
                <Button variant="contained" onClick={ ()=> { LaboratoriesButtonHandler() } } className='cta-button mint-nft-button'>
                    Laboratories
                </Button>
            </>
            }
            {Laboratories &&
             <>
             { labButton() }
             </> 
            }
            {!DataScience && !Laboratories &&
            <>
                <Button variant="contained" onClick={ ()=> { setDataScience(true) } } className='cta-button mint-nft-button'>
                    Data Science
                </Button>
            </>
            }
            {DataScience &&
            <>
            { DataScienceButton() }
            </>
            }
        </div>
        </>
    )

}

export default TokenizeIndex;