import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

import Row from './row.component';
import CategoryEditorDialog from '../editorDialog/categoryEditorDialog';

import { selectCategories } from '../../redux/category/category.selector';

import { useStyles } from './category.styles';
  
// const StyledMenuItem = withStyles((theme) => ({
//     root: {
//       '&:focus': {
//         backgroundColor: theme.palette.primary.main,
//         '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//           color: theme.palette.common.white,
//         },
//       },
//     },
// }))(MenuItem);

const Categories = ({categories}) => {
    const classes = useStyles();

    const [page, setPage] = useState(0); 
    const [dialog, setDialog] = useState(false);   

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
                            rowsPerPageOptions={[]} // disable RowsPerPage
                            component="div"
                            count={categories.length}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={10}
                            // rowsPerPage={rowsPerPage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
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
                        rowsPerPageOptions={[]} // disable RowsPerPage
                        component="div"
                        count={categories.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={10}
                        // rowsPerPage={rowsPerPage}
                        // onChangeRowsPerPage={handleChangeRowsPerPage}
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

// const mapStateToProps = state => ({
//     categories: state.category.categories
// })

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
})

export default connect(mapStateToProps)(Categories);