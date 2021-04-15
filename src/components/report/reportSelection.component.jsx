// import React modules
import React from 'react';

// import Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// import styles for the component
import { useStyles } from './report.styles.js';

/**
 * Report Selections
 * @param {*} props of component
 * @returns component
 */
const ReportSelection = props => {
    // use style
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Report Type"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={props.chart}
                                onChange={e => props.changeChart(e.target.value)}
                            >
                                <MenuItem value={"column"}>Column Chart</MenuItem>
                                <MenuItem value={"line"}>Line Chart</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActions>
                                <TextField label="Report Title" size="small" fullWidth value={props.title} onChange={e => props.changeTitle(e.target.value)} />
                            </CardActions>
                            <CardContent className={classes.cardContent}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Series</FormLabel>
                                            <RadioGroup name="series" value={props.dimension} onChange={e => props.changeDimension(e.target.value)}>
                                                <FormControlLabel value="data" control={<Radio />} label="Data" />
                                                <FormControlLabel value="period" control={<Radio />} label="Period" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Categories</FormLabel>
                                            <RadioGroup name="categories" value={(props.dimension === "data") ? "period" : "data"} onChange={e => props.changeDimension((e.target.value === "data") ? "period" : "data")}>
                                                <FormControlLabel value="data" control={<Radio />} label="Data" />
                                                <FormControlLabel value="period" control={<Radio />} label="Period" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" size="small" fullWidth onClick={() => props.updateReport()}>
                                    UPDATE
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default ReportSelection;