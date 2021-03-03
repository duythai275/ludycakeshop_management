import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Row from './row.component';
import WeightTypeEditorDialog from '../editorDialog/weightTypeEditorDialog';

import { selectWeightTypes } from '../../redux/weightType/weightType.selector';

import { useStyles } from './weightType.styles';

const WeightTypes = (props) => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [dialog, setDialog] = useState(false);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <div className={classes.title}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Weight Types
                            </Typography>
                        </div>
                        <div className={classes.pager}>
                            <TablePagination
                                rowsPerPageOptions={[]} // disable RowsPerPage
                                component="div"
                                count={props.weightTypes.length}
                                page={page}
                                // onChangePage={handleChangePage}
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
                            props.weightTypes.slice(page * 10, page * 10 + 10).map( weightType => 
                                <Row key={weightType.id} weightType={weightType} />
                            )
                        }
                        </TableBody>
                    </Table>
                    <div className={classes.pager}>
                        <TablePagination
                            rowsPerPageOptions={[]} // disable RowsPerPage
                            component="div"
                            count={props.weightTypes.length}
                            page={page}
                            // onChangePage={handleChangePage}
                            rowsPerPage={10}
                            // rowsPerPage={rowsPerPage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                    <Fab color="primary" aria-label="add" className={classes.fab} 
                        onClick={ () => setDialog(true)}
                    >
                        <AddIcon />
                    </Fab>
                    <WeightTypeEditorDialog 
                        weightType={{
                            name: ""
                        }} 
                        open={dialog} 
                        handleClose={() => setDialog(false)} 
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    weightTypes: selectWeightTypes
})

export default connect(mapStateToProps)(WeightTypes);