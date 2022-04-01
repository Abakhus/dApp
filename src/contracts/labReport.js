import {
    createContractClient,
    snip721Def
} from '@stakeordie/griptape.js';

export const abkt = createContractClient({
    id: 'Avocado Labs',
    at: 'secret1kj308k8t4g4d0vhs3cg9xvd8ykam6s4yn8xss9',
    definition: snip721Def
}); //At definition we can use extendContract(snip721Def, customDef)  - So we can use a single contract definiton as a product of binding both