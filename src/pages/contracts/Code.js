import {
    createContractClient,
    snip721Def
} from '@stakeordie/griptape.js';

export const dataBase  = createContractClient({
    id: 'Data Base',
    at: process.env.REACT_APP_CODE_CONT,
    definition: snip721Def
}); //At definition we can use extendContract(snip721Def, customDef)  - So we can use a single contract definiton as a product of binding both

//2nd contract secret1ue8ftnepnvjnq6mkrmeccgewa0kj9qndwrurmg