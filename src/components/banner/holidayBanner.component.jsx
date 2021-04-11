import React, { useState, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import AccessContext from '../../contexts/access.context';

import { updating, deleting } from '../../utils/fetching';
import { useStyles } from './banner.styles.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HolidayBanner = props => {
    const classes = useStyles();
    const { url, token } = useContext(AccessContext);

    const [dialog, setDialog] = useState(false);

    const [form, setForm] = useState({
        "holidayBannerId": props.data.holidayBannerId,
        "beginDate": props.data.beginDate,
        "endDate": props.data.endDate,
        "comment": props.data.comment,
        "bannerImageUrl": props.data.bannerImageUrl
    });

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const closeDialog = () => {
        setForm({
            "holidayBannerId": props.data.holidayBannerId,
            "beginDate": props.data.beginDate,
            "endDate": props.data.endDate,
            "comment": props.data.comment,
            "bannerImageUrl": props.data.bannerImageUrl
        });
        setFile(null);
        setImage(null);
        setDialog(false);
    }

    const deleteBanner = () => {
        props.openBackDrop();
        deleting(`${url}/v2/admin/holiday_banner/${props.data.holidayBannerId}`, token)
        .then(json => {
            props.loadBanner();
            closeDialog();
        });
    }

    const updateBanner = () => {
        props.openBackDrop();
        const o = ( file === null ) ? {
            "holidayBannerId": props.data.holidayBannerId,
            "beginDate": form.beginDate,
            "endDate": form.endDate,
            "comment": form.comment
        } : {
            "holidayBannerId": props.data.holidayBannerId,
            "beginDate": form.beginDate,
            "endDate": form.endDate,
            "comment": form.comment,
            "bannerImage": image.substring(image.indexOf(",")+1),
            "imageExtension": file.type.replace("image/",".")
        }
        updating(`${url}/v2/admin/holiday_banner`, token, o)
        .then(json => {
            props.loadBanner();
            closeDialog();
        });
    }

    const handleUploadImage = f => {
        const reader = new FileReader();

        reader.onload = e => {
            setImage(e.target.result);
        }

        reader.readAsDataURL(f);
        setFile(f);
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={props.data.bannerImageUrl}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            {props.data.comment}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`From ${props.data.beginDate} to ${props.data.endDate}`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button color="primary" onClick={() => setDialog(true)}>Edit</Button>
                    <Button color="primary" onClick={() => deleteBanner()}>Delete</Button>
                </CardActions>
            </Card>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={dialog}
                onClose={() => closeDialog()}
                TransitionComponent={Transition}
            >
                <DialogTitle><Typography variant="h5">Banner #{props.data.holidayBannerId}</Typography></DialogTitle>
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
                                    value={form.beginDate}
                                    onChange={e => setForm({...form, beginDate: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    value={form.endDate}
                                    onChange={e => setForm({...form, endDate: e.target.value})}
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
                    <Button variant="contained" color="primary" onClick={() => updateBanner()}>
                        Update
                    </Button>
                    <Button variant="contained" onClick={() => closeDialog()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HolidayBanner;