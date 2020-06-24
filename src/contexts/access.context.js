import { createContext } from 'react';

const AccessContext = createContext({
    url: undefined,
    token: undefined,
    handleLogIn: (newUrl,newToken) => {}
});

export default AccessContext;