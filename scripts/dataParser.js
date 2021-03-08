// DATA PARSER
// Data parsing functions

// Functions for events
function parseDataForEvent(n, data) {
    let dates = [];
    let events = [];
    if(n==0) {
        data.forEach(element => {
            let date = new Date(element.date);
            date.setHours(Number(element.hour));
            let label = createTimeLabel(date, false);
            dates.push(label);
            events.push(element.events);
        });
        eventData.hourly = {
            "dates": dates,
            "events": events,
            "time": Date.now()
        }
        statsType = "Hourly";
    }
    else {
        data.forEach(element => {
            let label = createTimeLabel(element.date, true);
            dates.push(label);
            events.push(element.events);
        });
        eventData.daily = {
            "dates": dates,
            "events": events,
            "time": Date.now()
        }
        statsType = "Daily";
    }
    switch(selectedTab) {
        case selection.CHART:
            plotSingleData(dates, events, `No. of ${statsType} Events`);
            break;
        case selection.TABLE:
            if(statsType === "Hourly") {
                populateTable(0);
            }
            else {
                populateTable(1);
            }
            break;
        case selection.MAP:
            break;
        default: break;
    }
    
}

// Functions for stats
function parseDataForStats(n, data) {
    let dates = [];
    let impressions = [];
    let clicks = [];
    let revenue = [];
    if(n==0) {
        data.forEach(element => {
            let date = new Date(element.date);
            date.setHours(Number(element.hour));
            let label = createTimeLabel(date, false);
            dates.push(label);
            impressions.push(element.impressions / 1000);
            clicks.push(element.clicks);
            let rev = element.revenue;
            revenue.push(parse(rev));
        });
        statsData.hourly = {
            "dates" : dates,
            "impressions": impressions,
            "clicks" : clicks,
            "revenue" : revenue,
            "time": Date.now()
        }
        statsType = "Hourly";
    }
    else {
        data.forEach(element => {
            let label = createTimeLabel(element.date, true);
            dates.push(label);
            impressions.push(element.impressions / 1000);
            clicks.push(element.clicks);
            let rev = element.revenue;
            revenue.push(parse(rev));
        })
        statsData.daily = {
            "dates" : dates,
            "impressions": impressions,
            "clicks" : clicks,
            "revenue" : revenue,
            "time": Date.now()
        }
        statsType = "Daily";
    }

    switch(selectedTab) {
        case selection.CHART:
            break;
        case selection.TABLE:
            if(statsType === "Hourly") {
                populateTable(2);
            }
            else {
                populateTable(3);
            }
            break;
        case selection.MAP:
            break;
        default: break;
    }
}


function parseDataForPOI(data) {
    let names = [];
    let ids = [];
    let lats = [];
    let lons = []; 
    data.forEach(element => {
        names.push(element.name);
        ids.push(element.poi_id);
        lats.push(element.lat);
        lons.push(element.lon);
    })
    poiData = {
        "names": names,
        "ids": ids,
        "lats": lats,
        "lons": lons,
        "time": Date.now()
    }
    populateTable(4);
}

function createTimeLabel(date, dateOnly) {
    if (!dateOnly) {
        return `${moment(date).format('ll')}, ${moment(date).format("LT")}`;
    }
    else {
        return `${moment(date).format('ll')}`;
    }
    
}

function parse(x) {
    return Number.parseFloat(x).toFixed(2);
  }