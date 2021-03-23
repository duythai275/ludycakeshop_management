import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

import { useStyles } from './report.styles.js';

HighchartsExporting(Highcharts);
/*
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
*/
const DataTypeSelection = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            {/* <Typography variant="subtitle1" component="h2">Data</Typography> */}
            <Grid container spacing={2}>
                {/* <Grid item md={6} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            label="Report Type"
                        >
                            <MenuItem>Column</MenuItem>
                            <MenuItem>Line</MenuItem>
                            <MenuItem>Table</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Dimension</InputLabel>
                        <Select
                            label="Dimension"
                        >
                            <MenuItem>Row</MenuItem>
                            <MenuItem>Column</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item md={6} xs={12}>
                    <TextField
                        select
                        label="Data"
                        // value={periodType}
                        // onChange={e => setPeriodType(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem>Departments</MenuItem>
                        <MenuItem>Products</MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        select
                        label="Data Type"
                        // value={periodType}
                        // onChange={e => setPeriodType(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem>Number of Sales</MenuItem>
                        <MenuItem>Sales Revenue</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Paper>
    )
}

const PeriodSelection = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardActions>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button fullWidth size="small">
                                    PREV YEAR
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth size="small">
                                    NEXT YEAR
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper} dense>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="January" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="Febuary" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="March" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="April" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="May" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="June" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="July" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="August" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="September" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="October" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="November" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Checkbox /></ListItemIcon>
                            <ListItemText primary="December" />
                        </ListItem>
                    </List>
                </Card>
                {/* <Paper className={classes.listPaper}>
                    
                </Paper> */}
            </Grid>
        </Grid>
    )
}

const DataSelection = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card>
                    <CardActions>
                        <TextField label="Search Product" fullWidth size="small" 
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
                                                // onClick={() => filterBy("","email")}
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
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper1} dense={true}>
                        <ListItem button>
                            <ListItemText primary="Product 1" secondary="Meat" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 2" secondary="Product" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 3" secondary="Grocery" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 4" secondary="Grocery" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActions>
                        <TextField label="Product" fullWidth size="small" value={"1 selected item"} disabled />
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper1} dense={true}>
                        <ListItem button>
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Product 5" secondary="Produce" />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    )
}

const PeriodTypeSelection = () => {
    const classes = useStyles();
    const [periodType, setPeriodType] = useState("monthly");

    return (
        <Paper className={classes.paper}>
            {/* <Typography variant="subtitle1" component="h2">Period</Typography> */}
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Period Type"
                        value={periodType}
                        onChange={e => setPeriodType(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value={"weekly"}>Weekly</MenuItem>
                        <MenuItem value={"monthly"}>Monthly</MenuItem>
                    </TextField>
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Year"
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                </Grid> */}
            </Grid>
        </Paper>
    )
}



const ReportTypeSelection = () => {
    const classes = useStyles();
    const [periodType, setPeriodType] = useState("monthly");

    return (
        <Paper className={classes.paper}>
            {/* <Typography variant="subtitle1" component="h2">Period</Typography> */}
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Report Type"
                        // value={periodType}
                        // onChange={e => setPeriodType(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem>Column Chart</MenuItem>
                        <MenuItem>Line Chart</MenuItem>
                        <MenuItem>Pivot Table</MenuItem>
                    </TextField>
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Year"
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                </Grid> */}
            </Grid>
        </Paper>
    )
}

const ReportSelection = () => {
    const classes = useStyles();
    // const [periodType, setPeriodType] = useState("monthly");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="subtitle1" component="h2">
                            Dimensions
                        </Typography>
                        <br/>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Data</FormLabel>
                                    <RadioGroup name="data" value={"category"}>
                                        <FormControlLabel value="category" control={<Radio />} label="Category" />
                                        <FormControlLabel value="serie" control={<Radio />} label="Serie" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Period</FormLabel>
                                    <RadioGroup name="period" value={"serie"}>
                                        <FormControlLabel value="category" control={<Radio />} label="Category" />
                                        <FormControlLabel value="serie" control={<Radio />} label="Serie" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" size="small" fullWidth>
                            UPDATE
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
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
         <Grid item xs={12} md={3} lg={3}>
            <ReportTypeSelection />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <PeriodTypeSelection />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <DataTypeSelection />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <ReportSelection />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <PeriodSelection />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <DataSelection />
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