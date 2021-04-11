import React, { useState, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import AccessContext from '../../contexts/access.context';
import { updating } from '../../utils/fetching';

import { useStyles } from './banner.styles.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HomeBanner = props => {
    const classes = useStyles();
    const { url, token } = useContext(AccessContext);

    const [dialog, setDialog] = useState(false);

    const [form, setForm] = useState({
        "id": props.data.id, 
        "homeBannerId": 1,
        "title": props.data.title,
        "description": props.data.description,
        "imageUrl": props.data.imageUrl
    });
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const closeDialog = () => {
        setForm({
            "id": props.data.id, 
            "homeBannerId": 1,
            "title": props.data.title,
            "description": props.data.description,
            "imageUrl": props.data.imageUrl
        });
        setFile(null);
        setImage(null);
        setDialog(false);
    }

    const updateBanner = () => {
        props.openBackDrop();
        const o = ( file === null ) ? {
            "id": props.data.id, 
            "homeBannerId": 1,
            "title": form.title,
            "description": form.description
        } : {
            "id": props.data.id, 
            "homeBannerId": 1,
            "title": form.title,
            "description": form.description,
            "image": image.substring(image.indexOf(",")+1),
            "imageFileExtension": file.type.replace("image/",".")
        }
        updating(`${url}/v2/admin/home_banner_item`, token, o)
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
                    {/* <CardHeader 
                        title={props.data.title}
                    /> */}
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={props.data.imageUrl}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            {props.data.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {
                            props.data.description
                        }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button color="primary" onClick={() => setDialog(true)}>Edit</Button>
                    {/* <Button color="primary">Delete</Button> */}
                </CardActions>
            </Card>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={dialog}
                onClose={() => closeDialog()}
                TransitionComponent={Transition}
            >
                <DialogTitle><Typography component="h4" variant="h5">Banner #{form.id}</Typography></DialogTitle>
                <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Title"
                                    fullWidth
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Description"
                                    fullWidth
                                    multiline rows={2}
                                    value={form.description}
                                    onChange={e => setForm({...form, description: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                                <Card className={classes.image}>
                                    <CardMedia 
                                        component="img"
                                        height="200"
                                        image={(image === null) ? form.imageUrl : image}
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
                    <Button variant="contained" color="primary" onClick={() => updateBanner()} >
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

export default HomeBanner;