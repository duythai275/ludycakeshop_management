import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
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

import { columnChart, lineChart } from './charts';

import { useStyles } from './report.styles.js';

HighchartsExporting(Highcharts);

const ReportTypeSelection = props => {
    const classes = useStyles();
    const [periodType, setPeriodType] = useState("monthly");

    return (
        <Paper className={classes.paper}>
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
                        value={props.chart}
                        onChange={e => props.changeChart(e.target.value)}
                    >
                        <MenuItem value={"column"}>Column Chart</MenuItem>
                        <MenuItem value={"line"}>Line Chart</MenuItem>
                        <MenuItem value={"table"}>Pivot Table</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Paper>
    )
}

const ReportSelection = props => {
    const classes = useStyles();
    // const [periodType, setPeriodType] = useState("monthly");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardActions>
                        <TextField label="Report Title" size="small" fullWidth value={props.title} onChange={e => props.changeTitle(e.target.value)} />
                    </CardActions>
                    <CardContent className={classes.cardContent}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12}>
                                <Typography variant="body1" component="span">
                                    Dimensions
                                </Typography>
                            </Grid> */}
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Period</FormLabel>
                                    <RadioGroup name="period" value={props.dimension} onChange={e => props.changeDimension(e.target.value)}>
                                        <FormControlLabel value="category" control={<Radio />} label="Category" />
                                        <FormControlLabel value="serie" control={<Radio />} label="Serie" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Data</FormLabel>
                                    <RadioGroup name="data" value={(props.dimension === "serie") ? "category" : "serie"} onChange={e => props.changeDimension((e.target.value === "serie") ? "category" : "serie")}>
                                        <FormControlLabel value="category" control={<Radio />} label="Category" />
                                        <FormControlLabel value="serie" control={<Radio />} label="Serie" />
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
    )
}

const PeriodTypeSelection = () => {
    const classes = useStyles();
    const [periodType, setPeriodType] = useState("monthly");

    return (
        <Paper className={classes.paper}>
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

const DataTypeSelection = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <TextField
                        select
                        label="Data"
                        // value={periodType}
                        // onChange={e => setPeriodType(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={"product"}
                    >
                        <MenuItem value="category">Departments</MenuItem>
                        <MenuItem value="product">Products</MenuItem>
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

const Reports = () => {
    const classes = useStyles();

    const fakeData = [
        [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
        [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
        [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    ];

    const [data, setData] = useState(['Grocery','Frozen','Produce','Meat']);
    const [period, setPeriod] = useState(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']);
    const [title, setTitle] = useState("Report");

    const [chart, setChart] = useState("column");
    const [dimension, setDimension] = useState("category");

    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);

    const [chartOption, setChartOption] = useState({});

    let transformData = [];

    const update = () => {
        transformData = [];
        series.forEach((serie, index) => {
            const d = (dimension === "category") ? fakeData[index] : fakeData.map( row => row[index]);
            transformData.push({
                name: serie,
                data: d
            });
        });

        if (chart === 'column') setChartOption(columnChart(title,categories,transformData));
        else if (chart === 'line') setChartOption(lineChart(title,categories,transformData));
        else setChartOption({});
    }

    useEffect(() => {
        if (dimension === "category") { 
            setCategories(period);
            setSeries(data);
        } else {
            setCategories(data);
            setSeries(period);
        }
    }, [dimension]);
    
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
            <ReportTypeSelection
                chart={chart} changeChart={ value => setChart(value) }
            />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <PeriodTypeSelection />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <DataTypeSelection />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <ReportSelection 
                title={title} changeTitle={ value => setTitle(value) } 
                dimension={dimension} changeDimension={ value => setDimension(value) } 
                updateReport={() => update()}
            />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <PeriodSelection />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <DataSelection />
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={chartOption}
                />
            </Paper>
        </Grid>
    </Grid>
    
)}

export default Reports;