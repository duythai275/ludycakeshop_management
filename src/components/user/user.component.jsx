import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

import Row from './row.component';

import AccessContext from '../../contexts/access.context';

import { getAllWithAuth } from '../../utils/fetching';
import { useStyles } from './user.styles';

const Users = () => {
    const classes = useStyles();

    const { url, token } = useContext(AccessContext);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        email: ""
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const filterBy = (value, property) => {
        setPage(0);
        filter[property] = value;
        setFilter({
            ...filter
        });
        setItems(
            users.filter( user => 
                user["email"].toUpperCase().includes(filter.email.toUpperCase())
            )
        );
    }

    useEffect(() => {
        getAllWithAuth(`${url}/admin/users/list`, token)
        .then(res => {
            setUsers(res);
            setItems(
                res.filter( user => 
                    user["email"].toUpperCase().includes(filter.email.toUpperCase())
                )
            );
        });
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <div className={classes.title}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Users
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
                            <TableRow className={classes.tableHead}>
                                <TableCell className={classes.tableHead} width={"40%"}>
                                    Email <br/>
                                    <TextField 
                                        placeholder="Search by Email" 
                                        variant="standard"
                                        onChange={event => filterBy(event.target.value,"email")}
                                        value={filter.email}
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
                                                            onClick={() => filterBy("","email")}
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
                                <TableCell className={classes.tableHead} width={"40%"} >Name</TableCell>
                                <TableCell className={classes.tableHead}>Active</TableCell>
                                <TableCell className={classes.tableHead}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            items.map(user => <Row user={user} />)
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
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Users;