// CHARTS.JS
// chart elements and plot functions


// router to plot the stats data as per the option selected for the additional 'compare among'
// options for charts
function plotDataForStats(n) {
    let accessRef = null;
    if(chartId.length == 1) {
        chartId.push(n);
    }
    else {
        chartId[1] = n;
    }
    if(statsType ===  "Hourly") {
        accessRef = statsData.hourly;
    }
    else {
        accessRef = statsData.daily;
    }
    switch(n) {
        case 0: //Revenue Stats
            plotSingleData(accessRef.dates, accessRef.revenue, `${statsType} Revenue`);
            break;
        case 1: // Impression Stats
            plotSingleData(accessRef.dates, accessRef.impressions, `${statsType} Impressions (in thousands)`);
            break;
        case 2: // Clicks Stats
            plotSingleData(accessRef.dates, accessRef.clicks, `${statsType} Clicks`);
            break;
        case 3: //Impressions Vs Clicks (Over Time)
            plotMixedData(accessRef.dates, accessRef.impressions, `${statsType} Impressions (in thousands)`, accessRef.clicks, `${statsType} Clicks`);
            break;
        case 4: //Clicks Vs Revenue (Over Time)
            plotMixedData(accessRef.dates, accessRef.clicks, `${statsType} Clicks`, accessRef.revenue, `${statsType} Revenue`);
            break;
        case 5: //Impressions Vs Revenue (Over Time)
            plotMixedData(accessRef.dates, accessRef.impressions, `${statsType} Impressions (in thousands)`, accessRef.revenue, `${statsType} Revenue`);
            break;
        default: break;
    } 

}

// Plotting functions

// Plots single value over time
function plotSingleData(xData, yData, yLabel) {
    if(currentChart) {
        currentChart.destroy();
    }
    document.getElementById("chart-inner-container").style.width = `${xData.length * 20}px`;
    let color = randomColor();
    currentChart = new Chart(ctx, {
        // The type of chart we want to create
        type: chartType,
        // The data for our dataset
        data: {
            labels: xData,
            datasets: [{
                label: yLabel,
                backgroundColor: color,
                borderColor: color,
                data: yData,
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                    }],
                    yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: `${yLabel} Count`
                    }
                    }]
                } 
        }
    });     
}

// plots two values over time
function plotMixedData(xAxis, dataOne, dataOneLabel, dataTwo, dataTwoLabel) {
    if(currentChart) {
        currentChart.destroy();
    }
    document.getElementById("chart-inner-container").style.width = `${xAxis.length * 20}px`;
    let color = randomColor();
    currentChart = new Chart(ctx, {
        type: chartType,
        data: {
            datasets: [{
                label: dataOneLabel,
                data: dataOne,
                borderColor: color,
                backgroundColor: color,
                fill: false,
                // this dataset is drawn below
                order: 1
            }, {
                label: dataTwoLabel,
                data: dataTwo,
                type: 'line',
                borderColor: 'rgb(255, 99, 255)',
                fill: false,
                // this dataset is drawn on top
                order: 2
            }],
            labels: xAxis
        },
        options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                    }]
                } 
        }
    });
}

// Function to update the chart type
// callback function for radio button selection
function updateChart(n) {
    if(n==0) {
        chartType = 'bar';
    }
    else {
        chartType = 'line';
    }
    console.log(chartId);
    if(chartId.length == 1) {
        if(chartId[0] == 0) {
            plotSingleData(eventData.hourly.dates, eventData.hourly.events, `No. of ${statsType} Events`);
        }
        if(chartId[0] == 1) {
            plotSingleData(eventData.daily.dates, eventData.daily.events, `No. of ${statsType} Events`);
        }
    }
    else {
        plotDataForStats(chartId[1]);
    }
    
}

// generates random color for chart on each load
function randomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
