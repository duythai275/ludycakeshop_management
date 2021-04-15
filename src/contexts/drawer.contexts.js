// import node_modules
import { createContext } from 'react';

// create context object for React Hook
// use for Main Menu
const DrawerContext = createContext({
    open: true,
    toggleOpen: () => {}
});

export default DrawerContext;