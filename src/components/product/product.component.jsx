import React, { useContext, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ContextMenu from '../../utils/contextMenu/contextMenu';
import StyledMenu from '../../utils/menu/menu';

// import ProductDialog from '../productEditor/productDialog.component';
import EditorDialog from '../../utils/editorDialog/editorDialog';

import AccessContext from '../../contexts/access.context';

import { selectProducts } from '../../redux/product/product.selector';
import  { selectCategories } from '../../redux/category/category.selector';
import { selectProductCategories } from '../../redux/productCategory/productCategory.selector';

import { useStyles } from './product.styles';

const Row = ({product}) => {
    const classes = useStyles();

    const { url } = useContext(AccessContext);

    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);
    
    const handleEdit = () => {
        console.log(`Edit Clicked - ${product.name}`);
        setAnchorEl(null);
        setDialog(true);
    }

    const handleDelete = () => {
        console.log(`Delete Clicked - ${product.name}`);
        setAnchorEl(null);
    }

    return (
    <TableRow hover ref={outerRef}>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.code}</TableCell>
        <TableCell className={classes.chip}>
        {
            product.categories.map( category => 
                <Chip key={category._id} size="small" label={category.name} />
            )

        }
        </TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell><Avatar src={`${url}/products/${product.image}`} className={classes.smallAvatar} /></TableCell>
        <TableCell align='center'>
            <IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton>
        </TableCell>
        <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
        <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
        <EditorDialog open={dialog} handleClose={() => setDialog(false)} data={product}/>
    </TableRow>
)}

const Products = ({products, categories, productCategories}) => {
    const classes = useStyles();

    const outerRef = useRef(null);
    const [items, setItems] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [filter, setFilter] = useState({
        name: "",
        code: "",
        category: ""
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };  

    const filterBy = (value, property) => {
        setPage(0);
        filter[property] = value;
        setFilter({
            ...filter
        });
    }

    useEffect( () => {

        products.map( product => {
            product["categories"] = productCategories.filter(
                productCategory => productCategory.product === product._id
            ).map(
                productCategory => {
                    const cate = categories.find( category => category._id === productCategory.category );
                    return {
                        ...cate,
                        mapping: productCategory._id
                    }
                }
            );
            return product;
        })

        setItems(products.filter( item => 
            item["name"].toUpperCase().includes(filter.name.toUpperCase()) 
            && item["code"].toUpperCase().includes(filter.code.toUpperCase()) 
            && item["categories"].find( 
                category => category.name.toUpperCase().includes(filter.category.toUpperCase()) 
            )
        ));

    }, [products, categories, productCategories, filter] )
    
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Products
                        </Typography>
                    </div>
                    <div className={classes.pager}>
                        <TablePagination
                            rowsPerPageOptions={[]} // disable RowsPerPage
                            component="div"
                            count={items.length}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            // rowsPerPage={rowsPerPage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name <br/>
                                <TextField 
                                    autoFocus={false}
                                    placeholder="Search by Name" 
                                    onChange={event => filterBy(event.target.value,"name")}
                                    value={filter.name}
                                    variant="standard"
                                    InputProps={
                                        {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        // disabled={!this.state.searchText}
                                                        onClick={() => filterBy("","name")}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                "aria-label": "Search",
                                            }
                                        }
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                Code <br/>
                                <TextField 
                                    autoFocus={false}
                                    placeholder="Search by Code" 
                                    variant="standard"
                                    onChange={event => filterBy(event.target.value,"code")}
                                    value={filter.code}
                                    InputProps={
                                        {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        // disabled={!this.state.searchText}
                                                        onClick={() => filterBy("","code")}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                "aria-label": "Search",
                                            }
                                        }
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                Categories <br/>
                                <TextField 
                                    autoFocus={false}
                                    placeholder="Search by Category" 
                                    onChange={event => filterBy(event.target.value,"category")}
                                    value={filter.category}
                                    variant="standard"
                                    InputProps={
                                        {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        // disabled={!this.state.searchText}
                                                        onClick={() => filterBy("","category")}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                "aria-label": "Search",
                                            }
                                        }
                                    }
                                />
                            </TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align='center'><SettingsIcon /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( product => <Row key={product._id} product={product} /> )
                    }
                    </TableBody>
                </Table>
                <div className={classes.pager}>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={items.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                    />
                </div>
                <Fab /* ref={outerRef} */ color="primary" aria-label="add" className={classes.fab} onClick={ () => setDialog(true)}>
                    <AddIcon />
                    {/* <ProductDialog outerRef={outerRef} /> */}
                </Fab>
                <EditorDialog open={dialog} handleClose={ () => setDialog(false) } data={
                    {
                        name: "New Product",
                        categories: []
                    }
                }/>
            </Paper>
        </Grid>
    </Grid>
)}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories,
    productCategories: selectProductCategories
})

export default connect(mapStateToProps)(Products);