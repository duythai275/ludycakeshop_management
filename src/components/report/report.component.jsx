import React, { useEffect, useState, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ReportSelection from './reportSelection.component';
import PeriodSelection from './periodSelection.component';
import DataSelection from './dataSelection.component';

import AccessContext from '../../contexts/access.context';
import { getAllWithAuth } from '../../utils/fetching';

import { useStyles } from './report.styles.js';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { columnChart, lineChart } from './charts';
HighchartsExporting(Highcharts);

const Reports = props => {
    const classes = useStyles();
    const { url, token } = useContext(AccessContext);

    // Report
    const [title, setTitle] = useState("Report");
    const [chart, setChart] = useState("column");
    const [key, setKey] = useState("data"); // key is seria

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

    const update = () => {

        let transformData = [];
        let ids = "";
        data.forEach( d => ids += `&idList=${d.id}`);

        getAllWithAuth(`${url}/admin/report?key=${key}&type=${(type === "category") ? "cate" : "prod"}&year=${year}&term=${(periodType === "monthly") ? "month" : "week"}${ids}`, token)
        .then( json => {

            series.forEach( ( serie, r ) => { 
                const obj = {
                    "name": (serie.hasOwnProperty("name")) ? serie.name : serie,
                    "data": categories.map( ( category, c ) => {
                        let d;

                        if ( key === "data" ) {
                            if ( json[r].filter( obj => obj.paid_date === ( c + 1 ) ).length > 0 ) d = json[r].filter( obj => obj.paid_date === ( c + 1 ) )[0];
                            else d = { "qty": 0, "sales": 0};
                        }
                        else {
                            if ( json[r][c] === {} ) d = { "qty": 0, "sales": 0};
                            else d = json[r][c];
                        }

                        return ( dataType === "Sales Revenue" ) ? d.sales : d.qty
                    })
                };
                transformData.push(obj);
            })
            
            if (chart === 'column') setChartOption(columnChart(title,categories,transformData,dataType));
            else if (chart === 'line') setChartOption(lineChart(title,categories,transformData,dataType));
            else setChartOption({});

        });
    }

    const handleDimension = () => {
        if (key === "data") { 
            setCategories(period);
            setSeries(data);
        } else {
            setCategories(data.map( d => d.name ));
            setSeries(period);
        }
    }

    useEffect( () => {
        handleDimension();
    }, [key,period,data])
    
    return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
            <ReportSelection
                chart={chart} changeChart={ value => setChart(value) }
                title={title} changeTitle={ value => setTitle(value) } 
                dimension={key} changeDimension={ value => setKey(value) } 
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