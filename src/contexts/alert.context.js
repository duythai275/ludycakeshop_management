import { createContext } from 'react';

const AlertContext = createContext({
    alert: false,
    alertMsg: undefined,
    handleAlert: (isOpen,msg) => {}
});

export default AlertContext;