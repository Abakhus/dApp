import {
    createContractClient,
    snip721Def,
    extendContract
} from '@stakeordie/griptape.js';

const abkt_permit = {
    queries: {
      getBalance({ permit }) {
        const query = { all_tokens: {} }
        return {
          with_permit: { query, permit }
        }
      }
    }
  }

export const abkt = createContractClient({
    id: 'abkt',
    at: 'secret1kj308k8t4g4d0vhs3cg9xvd8ykam6s4yn8xss9',
    definition: extendContract(snip721Def, abkt_permit)
}); //At definition we can use extendContract(snip721Def, customDef)  - So we can use a single contract definiton as a product of binding both