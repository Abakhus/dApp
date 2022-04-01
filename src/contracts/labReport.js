import {
    createContractClient,
    snip721Def
} from '@stakeordie/griptape.js';

export const abkt = createContractClient({
    id: 'Avocado Labs',
    at: 'secret1kj308k8t4g4d0vhs3cg9xvd8ykam6s4yn8xss9',
    definition: snip721Def
});