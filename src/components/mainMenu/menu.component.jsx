// import React modules
import React, { useState, useContext } from 'react';

// import React Router
import { withRouter } from 'react-router-dom';

// import node_module for style
import clsx from 'clsx';

// import Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PaymentIcon from '@material-ui/icons/Payment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

// import React contexts
import DrawerContext from '../../contexts/drawer.contexts';
import AccessContext from '../../contexts/access.context';

// import styles for the component
import { useStyles } from './menu.styles';

/**
 * Header Menu
 * @returns component
 */
const BarMenu = () => {
    // use style
    const classes = useStyles();

    // open/close main menu
    const { open, toggleOpen } = useContext(DrawerContext);

    return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
            <IconButton
                color="inherit"
                onClick={() => toggleOpen()}
                className={clsx( classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" className={classes.title}>Ludy Site's Management</Typography>
        </Toolbar>
    </AppBar>
)}

/**
 * Main Menu on Left
 * @param {*} props of the component 
 * @returns component
 */
const ListMenu = ({history}) => {
    // use style
    const classes = useStyles();

    // open/close main menu
    const { open, toggleOpen } = useContext(DrawerContext);
    
    // use context for handling login
    const { handleLogIn } = useContext(AccessContext);

    return (
    <Drawer
        variant="permanent"
        open={open}
        classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
    >
        <div className={classes.toolbarIcon}>
            <IconButton 
                onClick={() => toggleOpen()}
            >
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>
            <div>
                <ListItem button onClick={() => history.push("/orders")}>
                    <ListItemIcon>
                        <PaymentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                {/* <ListItem button onClick={() => history.push("/events")}>
                    <ListItemIcon>
                        <LoyaltyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItem> */}
            </div>
        </List>
        {/* <Divider />
        <List>
            <div>
                <ListItem button onClick={() => history.push("/products")}>
                    <ListItemIcon>
                        <LocalMallIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem button onClick={() => history.push(`/categories`)}>
                    <ListItemIcon>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
                <ListItem button onClick={() => history.push(`/weightTypes`)}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Weight Types" />
                </ListItem>
            </div>
        </List>
        <Divider />
        <List>
            <div>
                <ListItem button onClick={() => history.push("/reports")}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                </ListItem>
                <ListItem button onClick={() => history.push("/users")}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem button onClick={() => history.push("/banners")}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Banner" />
                </ListItem>
            </div>
        </List> */}
        <Divider />
        <List>
            <div>
                <ListItem button onClick={() => handleLogIn(undefined,undefined)}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </div>
        </List>
    </Drawer>
)}

/**
 * Two Menus
 * @param {*} props of component 
 * @returns component
 */
const Menu = ({history}) => {
    // state for open/close left menu
    const [open, setOpen] = useState(true);
    
    // handle open left menu
    const toggleOpen = () => setOpen(!open);

    return (
        <DrawerContext.Provider value={{
            open,
            toggleOpen
        }}>
            <BarMenu />
            <ListMenu history={history}/>
        </DrawerContext.Provider>
    )
}

export default withRouter(Menu);