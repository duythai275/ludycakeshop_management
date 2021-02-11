import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './report.styles.js';

const Reports = () => {
    const classes = useStyles();
    
    return (
    <Grid container spacing={2}>
        <Grid item xs={8} md={8} lg={8}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" component="h2">Data</Typography>
                <Grid container>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel>Dimension</InputLabel>
                            <Select>
                                <MenuItem>Row</MenuItem>
                                <MenuItem>Column</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" component="h2">Period</Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" component="h2">Report</Typography>
            </Paper>
        </Grid>
    </Grid>
)}

export default Reports;