// MAIN SCRIPT
// Global behavior on page load

const selection = Object.freeze({
    CHART: 0,
    TABLE: 1,
    MAP: 2
});

const dataTypes = Object.freeze({
    HOURLY_EVENTS: 0,
    DAILY_EVENTS: 1,
    HOURLY_STATS: 2
})

const FETCH_WAIT = 10000;
// Chart Vars
let ctx = document.getElementById("myChart").getContext('2d');
let currentChart = null;
let eventData = null;
let statsData = null;
let poiData = null;
let statsType = null;
let selectedTab = null;

// Table Vars
let currentTable = null;
// Map Vars

setChartVars();

function setDataSource(n) {
    if(selectedTab == selection.CHART && currentChart) {
        currentChart.destroy();
    }
    document.getElementById("additional-options").classList.add("d-none");
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
                document.getElementById("additional-options").classList.remove("d-none");
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
                document.getElementById("additional-options").classList.remove("d-none");
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

function setChartVars() {
    document.getElementById('additional-options').classList.add('d-none');
    document.getElementById("removeForChart").classList.add('d-none');
    document.getElementById("search-bar").classList.add('d-none');
    if(currentChart) {
        currentChart.destroy();
    }
    currentChart = null;
    eventData = {
        hourly: null,
        daily: null
    };
    statsType = null;
    statsData = {
        hourly: null,
        daily: null
    };
    selectedTab = selection.CHART;
}

function setTableVars() {
    document.getElementById('additional-options').classList.add('d-none');
    document.getElementById("removeForChart").classList.remove('d-none');
    document.getElementById("eventsTable").classList.add("d-none");
    document.getElementById("statsTable").classList.add("d-none");
    document.getElementById("poiTable").classList.add("d-none");
    document.getElementById("search-bar").classList.remove('d-none');
    document.getElementById("searchText").addEventListener("input", updateVal);
    selectedTab = selection.TABLE;
    currentTable = null;
}

function setMapVars() {
    document.getElementById('additional-options').classList.add('d-none');
    selectedTab = selection.MAP;
}
