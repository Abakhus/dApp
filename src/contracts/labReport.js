import {
    createContractClient,
    snip721Def
} from '@stakeordie/griptape.js';

export const abkt = createContractClient({
    id: 'abkt',
    at: 'secret1ue8ftnepnvjnq6mkrmeccgewa0kj9qndwrurmg',
    definition: snip721Def
}); //At definition we can use extendContract(snip721Def, customDef)  - So we can use a single contract definiton as a product of binding both

//2nd contract secret1ue8ftnepnvjnq6mkrmeccgewa0kj9qndwrurmg