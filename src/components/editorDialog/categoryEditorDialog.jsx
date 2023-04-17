// import React modules
import React, { useState, useContext, useEffect } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Redux action
import { fetchAllCategories, editCategory } from '../../redux/category/category.action';

// import functions for requesting to server 
import { adding, updating, getAll } from '../../utils/fetching';

// import Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';


/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Editor dialog for Category
 * @param {*} props of component
 * @returns component
 */
const CategoryEditorDialog = (props) => {

    // authentication
    const { url, token } = useContext(AccessContext);
    
    // alert for any action
    const { handleAlert } = useContext(AlertContext);

    // inputs
    const [category, setCategory] = useState({
        name: props.data.name,
        image: props.data.image
    });

    // handle adding category
    const handleAddCategory = () => {
        adding(`${url}/categories`, {
            categoryName: category.name,
            categoryImage: category.image
        })
        .then(result => {
            getAll(`${url}/categories`).then( arr => {
                props.addCategory(arr.map( cate => ({
                    id: cate.categoryID,
                    name: cate.categoryName,
                    image: cate.categoryImage
                }) ));
                handleAlert(true, "Added Successfully!");
            });
        });
        props.handleClose();
        setCategory({
            name: ""
        });
    }

    // handle updating category
    const handleUpdateCategory = () => {
        updating(`${url}/categories/${props.data.id}`, {
            categoryName: category.name,
            categoryImage: category.image
        })
        .then(result => {
            props.editCategory({
                id: props.data.id,
                name: category.name,
                image: category.image
            });
            handleAlert(true, "Edited Successfully!");
        });
        props.handleClose();
    }

    // update inputs
    const updateValue = ( value ) => {
        category["name"] = value;
        setCategory({...category});
    }

    // handle close dialog
    const closeDialog = () => {
        props.handleClose();
        setCategory({
            name: props.data.name,
            image: props.data.image
        })
    }

    // handle upload new image
    const handleUploadImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = e => {
            setCategory({
                ...category,
                image: e.target.result.split("base64,")[1]
            });
        }

        reader.readAsDataURL(file);
    }
    return (
        <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={props.open}
                onClose={() => closeDialog()}
                TransitionComponent={Transition}
            >
                <DialogTitle><Typography variant="h5">{(props.data.name === "") ? "Add Category" : "Update Category" }</Typography></DialogTitle>
                <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                            <TextField
                                label="Category Name"
                                fullWidth
                                value={category.name}
                                onChange={event => updateValue(event.target.value)}
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <br/>
                                <Card>
                                    <CardMedia 
                                        component="img"
                                        height="500"
                                        // image={(category.image === null) ? null : category.image}
                                        src={(category.image === null) ? null : `data:image;base64,${category.image}`}
                                    /><Divider />
                                    <CardActions>
                                        <label htmlFor="upload-image" style={{display:"inline-block", width: "100%"}}>
                                            <input 
                                                style={{ display: "none" }}
                                                accept="image/png, image/jpeg, image/jpg"
                                                id="upload-image"
                                                type="file"
                                                onChange={handleUploadImage}
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
                    {
                        (props.data.name === "") ? 
                            <Button variant="contained" color="primary" onClick={handleAddCategory}>
                                Add
                            </Button>
                        :
                        <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
                            Update
                        </Button>
                    }
                    <Button variant="contained" onClick={() => closeDialog()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    editCategory: category => dispatch(editCategory(category)),
    addCategory: categories => dispatch(fetchAllCategories(categories))
});

export default connect(null,mapDispatchToProps)(CategoryEditorDialog);