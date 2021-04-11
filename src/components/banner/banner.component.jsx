import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import HolidayBanner from './holidayBanner.component';
import HomeBanner from './homeBanner.component';

import AccessContext from '../../contexts/access.context';

import { getAllWithAuth } from '../../utils/fetching';
import { adding } from '../../utils/fetching';

import { useStyles } from './banner.styles.js';

const ErrorNotification = props => {
    // const { alert, alertMsg, handleAlert } = useContext(AlertContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.handleAlert(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={props.alert}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error" variant="filled"><strong>ERROR!</strong> No uploaded image</Alert>
        </Snackbar>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Banners = () => {
    const classes = useStyles();
    const { url, token } = useContext(AccessContext);

    const [alert, setAlert] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [form, setForm] = useState({
        "beginDate": "",
        "endDate": "",
        "comment": "",
        "bannerImageUrl": "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
    });

    const [holidayBanners, setHolidayBanners] = useState([]);
    const [homeBanners, setHomeBanners] = useState([]);

    const loadHolidayBabers = () => {
        getAllWithAuth(`${url}/v2/admin/holiday_banner`, token)
        .then( json => {
            setHolidayBanners(json);
            setBackdrop(false);
        })
    }

    const loadHomeBabers = () => {
        getAllWithAuth(`${url}/v2/admin/home_banner`, token)
        .then( json => {
            setHomeBanners(json);
            setBackdrop(false);
        })
    }

    const addBanner = () => {
        if ( file === null ) {
            setAlert(true);
        } else {
            setBackdrop(true);
            const o = {
                "beginDate": form.beginDate,
                "endDate": form.endDate,
                "comment": form.comment,
                "bannerImage": image.substring(image.indexOf(",")+1),
                "imageExtension": file.type.replace("image/",".")
            }
            adding(`${url}/v2/admin/holiday_banner`, token, o)
            .then(json => {
                loadHolidayBabers();
                closeDialog();
            });
        }
    }

    const closeDialog = () => {
        setForm({
            "beginDate": "",
            "endDate": "",
            "comment": "",
            "bannerImageUrl": "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
        });
        setFile(null);
        setImage(null);
        setDialog(false);
    }

    const handleUploadImage = f => {
        const reader = new FileReader();

        reader.onload = e => {
            setImage(e.target.result);
        }

        reader.readAsDataURL(f);
        setFile(f);
    }

    useEffect( () => {
        setBackdrop(true);
        Promise.all([
            getAllWithAuth(`${url}/v2/admin/holiday_banner`, token),
            getAllWithAuth(`${url}/v2/admin/home_banner`, token),
        ])
        .then( arr => {
            setHolidayBanners(arr[0]);
            setHomeBanners(arr[1]);
            setBackdrop(false);
        });
    }, []);
    
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Typography component="h6" variant="h6" color="primary">Home</Typography></Grid>
                        {
                            homeBanners.map( banner => 
                                <Grid key={banner.id} item xs={3}>
                                    <HomeBanner data={banner} 
                                        loadBanner={() => loadHomeBabers()}
                                        openBackDrop={() => setBackdrop(true)}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Typography component="h6" variant="h6" color="primary">Holiday</Typography></Grid>
                        {
                            holidayBanners.map( banner => 
                                <Grid key={banner.holidayBannerId} item xs={3}>
                                    <HolidayBanner data={banner} 
                                        loadBanner={() => loadHolidayBabers()}
                                        openBackDrop={() => setBackdrop(true)}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
                <Fab color="primary" aria-label="add" className={classes.fab} 
                    onClick={ () => setDialog(true)}
                >
                    <AddIcon />
                </Fab>
                <Backdrop className={classes.backdrop} open={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={dialog}
                onClose={() => closeDialog()}
                TransitionComponent={Transition}
            >
                <DialogTitle><Typography variant="h5">Add new Holiday Banner</Typography></DialogTitle>
                <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Title"
                                    fullWidth
                                    value={form.comment}
                                    onChange={e => setForm({...form, comment: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    defaultValue={form.beginDate}
                                    onChange={e => setForm({...form, beginDate: e.target.value})}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    defaultValue={form.endDate}
                                    onChange={e => setForm({...form, endDate: e.target.value})}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                                <Card className={classes.image}>
                                    <CardMedia 
                                        component="img"
                                        height="200"
                                        image={(image === null) ? form.bannerImageUrl : image}
                                    /><Divider />
                                    <CardActions>
                                        <label htmlFor="upload-image" style={{display:"inline-block", width: "100%"}}>
                                            <input 
                                                style={{ display: "none" }}
                                                accept="image/png, image/jpeg"
                                                id="upload-image"
                                                type="file"
                                                onChange={e => handleUploadImage(e.target.files[0])}
                                            />
                                            <Button startIcon={<PhotoCamera />} fullWidth variant="text" color="primary" size="small" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => addBanner()}>
                        Add
                    </Button>
                    <Button variant="contained" onClick={() => closeDialog()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <ErrorNotification alert={alert} handleAlert={ val => setAlert(val) } />
        </div>
    )
}



export default Banners;