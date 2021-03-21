import React , { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
// import ClearIcon from '@material-ui/icons/Clear';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Row from './row.component';
import EventEditorDialog from '../editorDialog/eventEditorDialog';

import AccessContext from '../../contexts/access.context';

import { getAllWithAuth } from '../../utils/fetching';

import { useStyles } from './event.styles';

const Events = () => {
    const classes = useStyles();

    const { url, token } = useContext(AccessContext);

    const [dialog, setDialog] = useState(false);   

    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        // setBackdrop(true);
        setPage(newPage);
    };

    const loadEvents = () => {
        let filter = "";
        getAllWithAuth(`${url}/admin/event?${filter}page=${(page + 1)}`, token)
        .then(json => {
            setTotalEvents(json.totalElements);
            setEvents(json.content);
        });
    }

    useEffect( () => {
        loadEvents();
    }, [page]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <div className={classes.title}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Events
                            </Typography>
                        </div>
                        <div className={classes.pager}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={totalEvents}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={10}
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>
                                    Event Name
                                </TableCell>
                                <TableCell className={classes.tableHead}>
                                    Start Date
                                </TableCell>
                                <TableCell className={classes.tableHead}>
                                    End Date
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                events.map( event => <Row key={event.id} event={event} />)
                            }
                        </TableBody>
                    </Table>
                    <div className={classes.pager}>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={totalEvents}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={10}
                        />
                    </div>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={ () => setDialog(true)}>
                        <AddIcon />
                    </Fab>
                    <EventEditorDialog
                        data={{
                            title: ""
                        }}
                        open={dialog}
                        handleClose={() => setDialog(false)}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Events;