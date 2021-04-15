/**
 * Column chart template
 * @param {*} title title
 * @param {*} categories categories of chart (not project)
 * @param {*} series series of chart
 * @param {*} dataType data type
 * @returns chart object
 */
export const columnChart = (title, categories, series, dataType) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: dataType
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
        series: series
    }
}

/**
 * Line chart template
 * @param {*} title title
 * @param {*} categories categories of chart (not project)
 * @param {*} series series of chart
 * @param {*} dataType data type
 * @returns chart object
 */
export const lineChart = (title, categories, series, dataType) => {
    return {
        chart: {
            type: 'line'
        },
        title: {
            text: title
        },
        yAxis: {
            title: {
                text: dataType
            }
        },
        xAxis: {
            categories: categories
        },
        series: series,
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        }
    }
}