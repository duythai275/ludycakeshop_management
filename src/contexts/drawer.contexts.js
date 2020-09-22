 import { createContext } from 'react';

const DrawerContext = createContext({
    open: true,
    toggleOpen: () => {}
});

export default DrawerContext;