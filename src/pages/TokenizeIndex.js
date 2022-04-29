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
                    <div className="lab">
                        <Button style={{ height: 43, width: 132 }} size="large" variant="contained"  className='cta-button mint-nft-button'>
                            Laudo
                        </Button>
                        <Button size="large" variant="contained"  className='cta-button mint-nft-button'>
                            Serviços
                        </Button>
                    </div>
                </>
            )
        }
    }

    const backHandler = async () =>{
        setDataScience(false);
        setLaboratories(false);
    }

    function BackButton() {
        if(true){
            return(
                <>
                    <div className='back' >                   
                        <Button size="large" variant="contained" onClick={ ()=> { backHandler() }} className='cta-button mint-nft-button'>
                            Voltar
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
                    <div className="ds" >                   
                        <Button size="large" style={{ height: 43, width: 132 }} variant="contained"  className='cta-button mint-nft-button'>
                            Relátorios
                        </Button>
                        <Button size="large" variant="contained"  className='cta-button mint-nft-button'>
                            Serviços
                        </Button>
                    </div>
                </>
            )
        }
    }

    return(
        <>
        <div className='spmain' >
            {!Laboratories && !DataScience &&
            <>
                <Button size="large" variant="contained" onClick={ ()=> { setLaboratories(true) } } className='cta-button mint-nft-button'>
                    Laboratories
                </Button>
            </>
            }
            {Laboratories &&
             <>
              <div className="tchoice">
                <h2>LABORATÓRIOS</h2>
            </div>
             <div>
                { BackButton() }
                { labButton() }
             </div>
             </> 
            }
            {!DataScience && !Laboratories &&
            <>
                <Button size="large" style={{ height: 50, width: 160 }} variant="contained" onClick={ ()=> { setDataScience(true) } } className='cta-button mint-nft-button'>
                    Data Science
                </Button>
            </>
            }
            {DataScience &&
            <>
            <div className="tchoice">
                <h2>DATA SCIENCE</h2>
            </div>
            <div>
                
                { BackButton() }
                { DataScienceButton() }
            </div>
            </>
            }
        </div>
        </>
    )

}

export default TokenizeIndex;