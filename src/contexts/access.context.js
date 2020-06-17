import { createContext } from 'react';

const AccessContext = createContext({
    // open: true,
    // toggleOpen: () => {}
    url: null,
    token: null
});

export default AccessContext;