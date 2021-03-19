import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from './event.styles';

const Events = () => {
    const classes = useStyles();

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
                        {/* <div className={classes.pager}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={items.length}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={10}
                            />
                        </div> */}
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Events;