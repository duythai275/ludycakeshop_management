import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';




const useDialog = outerRef => {
    const [ open, setOpen ] = useState(false);

    const handleClickOpen = useCallback( event => {
        event.preventDefault();
        if ( outerRef && outerRef.current.contains( event.target ) ) 
            setOpen(true);
        // else 
        //     setOpen(false);
    }, [ outerRef ]
    );

    const handleClose = useCallback( () => {
        setOpen(false);
    }, []);

    useEffect( () => {
        document.addEventListener("click", handleClickOpen);
        return () => document.removeEventListener("click", handleClickOpen);
    });

    return { open, handleClose };
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ outerRef }) => {
    const classes = useStyles();
    const { open, handleClose } = useDialog(outerRef);

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        New Product
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
        </Dialog>
    )
}

export default ProductDialog;