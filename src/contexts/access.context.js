// import node_modules
import { createContext } from 'react';

// create context object for React Hook
// use for Authentication
const AccessContext = createContext({
    url: undefined,
    token: undefined,
    handleLogIn: (newUrl,newToken) => {}
});

export default AccessContext;