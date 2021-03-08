// chart elements and plot functions
           
function plotDataForStats(n) {
    let accessRef = null;
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
function plotSingleData(xData, yData, yLabel) {
    if(currentChart) {
        currentChart.destroy();
    }
    document.getElementById("chart-inner-container").style.width = `${xData.length * 20}px`;
    currentChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: xData,
            datasets: [{
                label: yLabel,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
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

function plotMixedData(xAxis, dataOne, dataOneLabel, dataTwo, dataTwoLabel) {
    if(currentChart) {
        currentChart.destroy();
    }
    document.getElementById("chart-inner-container").style.width = `${xAxis.length * 20}px`;
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: dataOneLabel,
                data: dataOne,
                borderColor: 'rgb(255, 99, 132)',
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
