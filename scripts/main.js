// MAIN SCRIPT
// Global behavior on page load

// CONST vars for global scope
// selection enum for specifying the selected window
const selection = Object.freeze({
    CHART: 0,
    TABLE: 1,
    MAP: 2
});

// Fetch wait time in milliseconds
const FETCH_WAIT = 10000;
// selected tab tracker
let selectedTab = null;
// Data Vars
let eventData = null;
let statsData = null;
let poiData = null;
let statsType = null;

// Chart Vars
let ctx = document.getElementById("myChart").getContext('2d');
let currentChart = null;
let chartType = null;
let chartId = null;

// Table Vars
let currentTable = null;

// Map Vars
let mapData = null;

// Initial call on page load
setChartVars();

// callback function for selection of main options
// upon selection of data source
function setDataSource(n) {
    if(selectedTab == selection.CHART && currentChart) {
        currentChart.destroy();
    }
    if(selectedTab == selection.CHART) {
        chartId = [];
        chartId.push(n)
    }
    hideElementById(["additional-options"]);
    let fetchData = false;
    let url;
    // checks weather data fetched before 10 sec or not
    switch(n) {
        case 0: 
            if(eventData.hourly && eventData.hourly.time > (Date.now() - FETCH_WAIT)) {
                statsType = "Hourly";
            }
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/events/hourly";
            break;
        case 1: 
            if(eventData.daily && eventData.daily.time > (Date.now() - FETCH_WAIT)) {
                statsType = "Daily";
            }
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/events/daily";
            break;
        case 2: 
        // update view for addtional options
            if(selectedTab == selection.CHART) {
                showElementById(["additional-options"]);
            }
            if(statsData.hourly && statsData.hourly.time > (Date.now() - FETCH_WAIT)) {
                statsType = "Hourly";
            }
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/stats/hourly";
            break;
        case 3: 
        // Update view for additional options
            if(selectedTab == selection.CHART) {
                showElementById(["additional-options"]);
            }
            if(statsData.daily && statsData.daily.time > (Date.now() - FETCH_WAIT)) {
                statsType = "Daily";
            }
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/stats/daily";
            break;
        case 4: 
            if(poiData && poiData.time > (Date.now() - FETCH_WAIT)) {
                
            } 
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/poi";
        break;
        default: break;
    }
    
    if(fetchData) {
        fetch(url)
        .then(data => {
            return data.json();
        })
        .then(data => {
            console.log(data);
            switch(n) {
                case 0: 
                    parseDataForEvent(n, data);
                    break;
                case 1: 
                    parseDataForEvent(n, data);
                    break;
                case 2: 
                    parseDataForStats(0, data);
                    break;
                case 3:
                    parseDataForStats(1, data);
                    break;
                    // add for POI
                case 4: 
                    parseDataForPOI(data);
                    break;
                default: break;
            }
        })
        .error(error => {
            console.log(error); 
        })
    }
    else {
        // Uses cached data instead of fetching data again
        switch(selectedTab) {
            case selection.CHART:
                if(n == 0) {
                    plotSingleData(eventData.hourly.dates, eventData.hourly.events, `No. of ${statsType} Events`);
                }
                if(n == 1) {
                    plotSingleData(eventData.daily.dates, eventData.daily.events, `No. of ${statsType} Events`);
                }
                break;
            case selection.TABLE:
                populateTable(n);
                break;
            case selection.MAP:
                break;
            default: break;
        }
        
    }
    
}

// Initial load callback functions for each tab

// chart tab load function
function setChartVars() {
    hideElementById(['additional-options', "removeForChart", "search-bar"]);
    showElementById(['chartType', 'mainOptions']);
   
    if(currentChart) {
        currentChart.destroy();
    }
    currentChart = null;
    chartType = 'bar';
    eventData = {
        hourly: null,
        daily: null
    };
    statsType = null;
    statsData = {
        hourly: null,
        daily: null
    };
    chartId = [];
    selectedTab = selection.CHART;
}

// table tab load function
function setTableVars() {
    showElementById(["removeForChart", "search-bar", "mainOptions"]);
    hideElementById(['additional-options',"eventsTable", "statsTable", "poiTable", 'chartType']);
    document.getElementById("searchText").addEventListener("input", updateVal);
    
    selectedTab = selection.TABLE;
    currentTable = null;
}

// Map tab load
function setMapVars() {
    hideElementById(['additional-options', "search-bar", 'chartType', 'mainOptions']);
    showElementById(['additional-options']);
    selectedTab = selection.MAP;
    mapData = {
        eventhourly: null,
        eventdaily: null, 
        stathourly: null, 
        statdaily: null, 
        poi: null
    }
    document.getElementById("myMap").innerHTML = "";
    fetchDataForMap();
    
}

// Function to show elements
// args
// 1. elementsArr: elements array to show
function showElementById(elementsArr) {
    elementsArr.forEach(elem => {
        document.getElementById(elem).classList.remove('d-none');
    })
}

// Function to hide elements
// args
// 1. elementsArr: elements array to hide
function hideElementById(elementsArr) {
    elementsArr.forEach(elem => {
        document.getElementById(elem).classList.add('d-none');
    })
}

