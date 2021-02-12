import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import { useStyles } from './report.styles.js';

HighchartsExporting(Highcharts);

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
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={chartOption}
                />
            </Paper>
        </Grid>
    </Grid>
)}

export default Reports;