import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { useStyles } from './banner.styles.js';

const Banner = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Contemplative Reptile"
                    image="https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Title
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        - Description <br/>
                        - Start Date <br/>
                        - End Date
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary">Edit</Button>
                <Button color="primary">Delete</Button>
            </CardActions>
        </Card>
    )
}

const AddBanner = () => {
    // const classes = useStyles();

    return (
        <Fab aria-label="add">
            <AddIcon />
        </Fab>
    )
}

const Banners = () => {
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" color="primary">Home Banners</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <AddBanner/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" color="primary">Holiday</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5" color="primary">Weekly Promotion</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                    <Grid item xs={3}>
                        <Banner/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}



export default Banners;