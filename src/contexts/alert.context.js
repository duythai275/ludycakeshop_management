// import node_modules
import { createContext } from 'react';

// create context object for React Hook
// use for Alert
const AlertContext = createContext({
    alert: false,
    alertMsg: undefined,
    handleAlert: (isOpen,msg) => {}
});

export default AlertContext;