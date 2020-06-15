import React, { useState } from 'react';
import clsx from 'clsx';
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
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useStyles } from './mainpage.styles';

const Mainpage = () => {
    const classes = useStyles();
    const [ open, setOpen ] = useState(true);


    return (
    <div className={classes.root}>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    // edge="start"
                    color="inherit"
                    // aria-label="open drawer"
                    onClick={() => setOpen(true)}
                    className={clsx( classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" className={classes.title}>Hiephoa Site's Management</Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            open={open}
            classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
            // className={clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => setOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <div>
                    <ListItem button>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </div>
            </List>
            <Divider />
            <List>
                <div>
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
        <main className={classes.content}></main>
    </div>
)}

export default Mainpage;