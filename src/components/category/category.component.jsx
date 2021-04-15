// import React modules
import React, { useState } from 'react';

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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// import row and editor dialog components
import Row from './row.component';
import CategoryEditorDialog from '../editorDialog/categoryEditorDialog';

// import selector for Redux
import { selectCategories } from '../../redux/category/category.selector';

// import styles for the component
import { useStyles } from './category.styles';

/**
 * Component of category management page
 * @param {*} props of the component
 * @returns component
 */
 const Categories = ({categories}) => {
    // use style
    const classes = useStyles();

    // state for paging and dialog
    const [page, setPage] = useState(0); 
    const [dialog, setDialog] = useState(false);   

    // handle paging
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };  

    return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Categories
                        </Typography>
                    </div>
                    <div className={classes.pager}>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={categories.length}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={10}
                        />
                    </div>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Name</TableCell>
                            <TableCell className={classes.tableHead}>Id</TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        categories.slice(page * 10, page * 10 + 10).map( category => 
                            <Row key={category.id} category={category} />
                        )
                    }
                    </TableBody>
                </Table>
                <div className={classes.pager}>
                    <TablePagination
                        rowsPerPageOptions={[]} 
                        component="div"
                        count={categories.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={10}
                    />
                </div>
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={ () => setDialog(true)}>
                    <AddIcon />
                </Fab>
                <CategoryEditorDialog 
                    data={{
                        name: ""
                    }} 
                    open={dialog} 
                    handleClose={() => setDialog(false)} 
                />
            </Paper>
        </Grid>
    </Grid>
)}

// map state to props of the component
const mapStateToProps = createStructuredSelector({
    categories: selectCategories
})

export default connect(mapStateToProps)(Categories);