import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import { useStyles } from './report.styles.js';

HighchartsExporting(Highcharts);

const TransferList = () => {
    const classes = useStyles();
    return (
        // <Paper className={classes.paper}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <Paper className={classes.paper}>
                        <List dense component="div" role="list">
                            <ListItem role="listitem" button>
                                <ListItemIcon>
                                    <Checkbox
                                        disableRipple
                                        // inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`Test 1`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            // className={classes.button}
                            // onClick={handleCheckedRight}
                            // disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            // className={classes.button}
                            // onClick={handleCheckedLeft}
                            // disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <List dense component="div" role="list">
                            <ListItem role="listitem" button>
                                <ListItemIcon>
                                    <Checkbox
                                        disableRipple
                                        // inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`Test 1`} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        // </Paper>
    )
}

const DataSelection = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant="subtitle1" component="h2">Data</Typography>
            <Grid container>
                <Grid item md={4} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Dimension</InputLabel>
                        <Select
                            label="Dimension"
                        >
                            <MenuItem>Row</MenuItem>
                            <MenuItem>Column</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Data</InputLabel>
                        <Select
                            label="Data"
                        >
                            <MenuItem>Departments</MenuItem>
                            <MenuItem>Products</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Data Type</InputLabel>
                        <Select
                            label="Data Type"
                        >
                            <MenuItem>Number of Sales</MenuItem>
                            <MenuItem>Sales Revenue</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TransferList />
                </Grid>
            </Grid>
        </Paper>
    )
}

const PeriodSelection = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant="subtitle1" component="h2">Period</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl1}>
                        <InputLabel>Period Type</InputLabel>
                        <Select
                            label="Period Type"
                        >
                            <MenuItem>Weekly</MenuItem>
                            <MenuItem>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl1}>
                        <TextField
                            label="Start Date"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl1}>
                    <TextField
                            label="End Date"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}

const Reports = () => {
    const classes = useStyles();

    const chartOption = { // Sample data
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Sales'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Thousands'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>${point.y:.1f} k</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Grocery',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    
        }, {
            name: 'Frozen',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    
        }, {
            name: 'Produce',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    
        }, {
            name: 'Meat',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    
        }]
    };
    
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
            <DataSelection />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
            <PeriodSelection />
        </Grid>
        {/* <Grid item xs={12} md={8} lg={8}>
            <TransferList />
        </Grid> */}
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" component="h2">Report</Typography>
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={chartOption}
                />
            </Paper>
        </Grid>
    </Grid>
)}

export default Reports;