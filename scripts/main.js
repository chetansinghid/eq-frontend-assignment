// MAIN SCRIPT
// Global behavior on page load

const selection = Object.freeze({
    CHART: 0,
    TABLE: 1,
    MAP: 2
});

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

// Map Vars

setChartVars();

function setDataSource(n) {
    if(selectedTab == selection.CHART && currentChart) {
        currentChart.destroy();
        document.getElementById("additional-options").classList.add("d-none");
    }
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
            if(statsData.hourly && statsData.hourly.time > (Date.now() - FETCH_WAIT)) {
                statsType = "Hourly";
            }
            else {
                fetchData = true;
            }
            url = "https://proximal-ring-pipe.glitch.me/stats/hourly";
            break;
        case 3: 
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
                    if(selectedTab == selection.CHART) {
                        document.getElementById("additional-options").classList.remove("d-none");
                    }
                    parseDataForStats(0, data);
                    break;
                case 3:
                    if(selectedTab == selection.CHART) {
                        document.getElementById("additional-options").classList.remove("d-none");
                    }
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
                if(n == 0 || n == 1) {
                    console.log();
                    if(statsType === "Hourly") {
                        plotSingleData(eventData.hourly.dates, eventData.hourly.events, `No. of ${statsType} Events`);
                    }
                    else {
                        plotSingleData(eventData.daily.dates, eventData.daily.events, `No. of ${statsType} Events`);
                    }
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
    selectedTab = selection.TABLE;
}

function setMapVars() {
    document.getElementById('additional-options').classList.add('d-none');
    selectedTab = selection.MAP;
}


// Fuzzy search method
String.prototype.fuzzy = function (s) {
    var hay = this.toLowerCase(), i = 0, n = -1, l;
    s = s.toLowerCase();
    for (; l = s[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true;
};

// ('a haystack with a needle').fuzzy('hay sucks');    // false
// ('a haystack with a needle').fuzzy('sack hand');    // true