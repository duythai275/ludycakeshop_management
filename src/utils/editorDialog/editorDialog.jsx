import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    subTitle: {
        // paddingBottom: theme.spacing(1)
    },
    layout: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#F3F3F3'
    },
    paper: {
        width: 'auto',
        margin: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(6),
        }
    },
    formControl: {
        width: '100%'
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
        // paddingTop: theme.spacing(2)
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditorDialog = ({ open, handleClose, data }) => {
    const classes = useStyles();

    const handleDelete = () => {}

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {data.name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="Name" fullWidth value={data.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Code" fullWidth value={data.code} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Price" fullWidth value={data.price} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel 
                                control={<Checkbox checked={data.weeklySpecial} color="primary" />}
                                label="Weekend Special"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" className={classes.subTitle}>
                                Categories
                                <IconButton><AddCircleIcon /></IconButton>
                            </Typography> 
                            
                            <div className={classes.chip}>
                                {
                                    data.categories.map( category => 
                                        <Chip key={category._id} label={category.name} onDelete={handleDelete}/>
                                    )
                                }
                                <Fade in={true}>
                                    <FormControl className={classes.formControl}>
                                        <Select>
                                            <MenuItem value="FV">Fruits & Vegetables</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Fade>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Image" fullWidth />
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </Dialog>
    )
}

export default EditorDialog;