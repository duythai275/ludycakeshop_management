// import React modules
import React, { useState, useEffect } from 'react';

// import React Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import row, editor and import/export dialog components
import ProductEditorDialog from '../editorDialog/productEditorDialog';
import ImportExportDialog from '../editorDialog/importExportDialog';
import Row from './row.component';

// import selector for Redux
import { selectProducts } from '../../redux/product/product.selector';
import  { selectCategories } from '../../redux/category/category.selector';

// import styles for the component
import { useStyles } from './product.styles';

/**
 * Component of product management page
 * @param {*} props of the component 
 * @returns component
 */
const Products = ({products, categories}) => {
    // use style
    const classes = useStyles();

    const [items, setItems] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [syncDialog, setSyncDialog] = useState(false);
    const [filter, setFilter] = useState({
        name: "",
        brand: "",
        category: ""
    });

    // page
    const [page, setPage] = useState(0);

    // handle paging
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };  

    // handle searching
    const filterBy = (value, property) => {
        setPage(0);
        filter[property] = value;
        setFilter({
            ...filter
        });
    }

    // load data for filter
    useEffect( () => {

        products.map( product => {
            if ( product.brand === null ) product.brand = "";
            return product;
        });

        setItems(products.filter( item => 
            item["name"].toUpperCase().includes(filter.name.toUpperCase()) 
            && item["brand"].toUpperCase().includes(filter.brand.toUpperCase())
            && categories.find(cate => cate.id === item["category"]).name.toUpperCase().includes(filter.category.toUpperCase())
        ));

    }, [products, categories, filter] );

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
                                rowsPerPageOptions={[]} 
                                component="div"
                                count={items.length}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={10}
                            />
                        </div>
                    </div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>
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
                                <TableCell className={classes.tableHead}>
                                    Brand <br/>
                                    <TextField 
                                        autoFocus={false}
                                        placeholder="Search by Brand" 
                                        variant="standard"
                                        onChange={event => filterBy(event.target.value,"brand")}
                                        value={filter.brand}
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
                                                            onClick={() => filterBy("","brand")}
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
                                <TableCell className={classes.tableHead}>
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
                                <TableCell className={classes.tableHead}>Price</TableCell>
                                <TableCell align='center'><SettingsIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            items.slice(page * 10, page * 10 + 10).map( product => <Row key={product.id} product={product} /> )
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
                            rowsPerPage={10}
                        />
                    </div>
                    <Fab /* ref={outerRef} */ aria-label="add" className={classes.fab1} onClick={ () => setSyncDialog(true)}>
                        <ImportExportIcon />
                    </Fab>
                    <Fab /* ref={outerRef} */ color="primary" aria-label="add" className={classes.fab} onClick={ () => setDialog(true)}>
                        <AddIcon />
                    </Fab>
                    <ProductEditorDialog open={dialog} handleClose={ () => setDialog(false) } data={
                        {
                            name: "New Product",
                            categories: [],
                            image: "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
                        }
                    }/>
                    <ImportExportDialog open={syncDialog} handleClose={ () => setSyncDialog(false) } />
                </Paper>
            </Grid>
        </Grid>
)}

// map state to props of the component
const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories
});

export default connect(mapStateToProps)(Products);