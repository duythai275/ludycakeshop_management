import React from 'react';
// import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Products from '../product/product.component';
import Menu from '../menu/menu.component'
import { useStyles } from './mainpage.styles';

const Mainpage = () => {
    const classes = useStyles();
    // const [ open, setOpen ] = useState(true);


    return (
    <div className={classes.root}>
        <Menu />
        <main className={classes.content}>
            <div className={classes.appBarSpacer}></div>
            <Container maxWidth="1g" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><Products /></Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    </div>
)}

export default Mainpage;