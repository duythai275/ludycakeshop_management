// import React modules
import React , { useState, useEffect, useContext } from 'react';

// import Material UI
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

// import row and editor components
import Row from './row.component';
import EventEditorDialog from '../editorDialog/eventEditorDialog';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import functions for requesting to server 
import { getAllWithAuth } from '../../utils/fetching';

// import styles for the component
import { useStyles } from './event.styles';

/**
 * Component of event management page
 * @param {*} props of the component 
 * @returns component
 */
 const Events = () => {
    // use style
    const classes = useStyles();

    // state for backdrop and dialog
    const [backdrop, setBackdrop] = useState(false);
    const [dialog, setDialog] = useState(false); 

    // authentication
    const { url, token } = useContext(AccessContext);

    // data
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);

    // page
    const [page, setPage] = useState(0);

    // filter
    const [filters, setFilters] = useState({
        name: "",
        startDate: "",
        endDate: ""
    });

    // handle searching
    const filterBy = (value, property) => {
        filters[property] = value;
        setPage(0);
        setFilters({
            ...filters
        });
    }

    // handle paging
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // load data
    const loadEvents = () => {
        setBackdrop(true);
        let filter = "";
        if ( filters["name"] !== "" ) filter += `name=${filters.name}&`;
        if ( filters["startDate"] !== "" && filters["endDate"] === "" ) filter += `date=${filters.startDate}:${filters.startDate}&`;
        if ( filters["startDate"] === "" && filters["endDate"] !== "" ) filter += `date=${filters.endDate}:${filters.endDate}&`;
        if ( filters["startDate"] !== "" && filters["endDate"] !== "" ) filter += `date=${filters.startDate}:${filters.endDate}&`;
        getAllWithAuth(`${url}/admin/event?${filter}page=${(page + 1)}`, token)
        .then(json => {
            setTotalEvents(json.totalElements);
            setEvents(json.content);
            setBackdrop(false);
        });
    }

    // load data for first time
    useEffect( () => {
        setBackdrop(true);
        let filter = "";
        if ( filters["name"] !== "" ) filter += `name=${filters.name}&`;
        if ( filters["startDate"] !== "" && filters["endDate"] === "" ) filter += `date=${filters.startDate}:${filters.startDate}&`;
        if ( filters["startDate"] === "" && filters["endDate"] !== "" ) filter += `date=${filters.endDate}:${filters.endDate}&`;
        if ( filters["startDate"] !== "" && filters["endDate"] !== "" ) filter += `date=${filters.startDate}:${filters.endDate}&`;
        
        getAllWithAuth(`${url}/admin/event?${filter}page=${(page + 1)}`, token)
        .then(json => {
            setTotalEvents(json.totalElements);
            setEvents(json.content);
            setBackdrop(false);
        });
    }, [page,filters,token,url]);

    return (
        <div>
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
                                        Event Name <br/>
                                        <TextField 
                                            placeholder="Search by Name" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"name")}
                                            value={filters.name}
                                            InputProps = {
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
                                        Start Date <br/>
                                        <TextField 
                                            placeholder="Search by Date" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"startDate")}
                                            value={filters.startDate}
                                            InputProps = {
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                                <SearchIcon fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => filterBy("","startDate")}
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
                                        End Date <br/>
                                        <TextField 
                                            placeholder="Search by Date" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"endDate")}
                                            value={filters.endDate}
                                            InputProps = {
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                                <SearchIcon fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => filterBy("","endDate")}
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
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    events.map( event => <Row key={event.id} event={event} updateEvents={() => loadEvents()} handleBackdrop={() => setBackdrop(true)} />)
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
                            handleBackdrop={() => setBackdrop(true)}
                            updateEvents={() => loadEvents()}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Events;