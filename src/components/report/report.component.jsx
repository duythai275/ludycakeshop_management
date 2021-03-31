import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ReportSelection from './reportSelection.component';
import PeriodSelection from './periodSelection.component';
import DataSelection from './dataSelection.component';

import { useStyles } from './report.styles.js';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { columnChart, lineChart } from './charts';
HighchartsExporting(Highcharts);

const Reports = props => {
    const classes = useStyles();

    const fakeData = [
        [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.1],
        [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
        [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
        [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    ];

    // Report
    const [title, setTitle] = useState("Report");
    const [chart, setChart] = useState("column");
    const [dimension, setDimension] = useState("category");

    // Period
    const [period, setPeriod] = useState([]);
    const [periodType, setPeriodType] = useState("monthly");
    const [year, setYear] = useState(2021);

    // Data
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState("Sales Revenue");
    const [type, setType] = useState("category");
        
    // HighChart
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

        if (chart === 'column') setChartOption(columnChart(title,categories,transformData,dataType));
        else if (chart === 'line') setChartOption(lineChart(title,categories,transformData,dataType));
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
            <ReportSelection
                chart={chart} changeChart={ value => setChart(value) }
                title={title} changeTitle={ value => setTitle(value) } 
                dimension={dimension} changeDimension={ value => setDimension(value) } 
                updateReport={() => update()}
            />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            <PeriodSelection 
                period={period} changePeriod={periods => setPeriod(periods)}
                periodType={periodType} changePeriodType={ pType => setPeriodType(pType) }
                year={year} changeYear={y => setYear(y)}
            />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <DataSelection 
                data={data} changeData={d => setData(d)}
                dataType={dataType} changeDataType={dType => setDataType(dType)}
                type={type} changeType={t => setType(t)}
            />
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