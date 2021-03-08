function populateTable(n) {
    document.getElementById("eventsTable").classList.add("d-none");
    document.getElementById("statsTable").classList.add("d-none");
    document.getElementById("poiTable").classList.add("d-none");
    let len = null, table = null;
    switch(n) {
        case 0: 
            document.getElementById("eventsTable").classList.remove("d-none");
            len = eventData.hourly.dates.length;
            table = document.getElementById("eventsTableBody");
            table.innerHTML = "";
            for(let i = 0; i < len; i++) {
                let row = table.insertRow(-1);
                let cell = row.insertCell(-1);
                cell.innerHTML = eventData.hourly.dates[i];
                cell = row.insertCell(-1);
                cell.innerHTML = eventData.hourly.events[i];
            }
            break;
        case 1:
            document.getElementById("eventsTable").classList.remove("d-none");
            len = eventData.daily.dates.length;
            table = document.getElementById("eventsTableBody");
            table.innerHTML = "";
            for(let i = 0; i < len; i++) {
                let row = table.insertRow(-1);
                let cell = row.insertCell(-1);
                cell.innerHTML = eventData.daily.dates[i];
                cell = row.insertCell(-1);
                cell.innerHTML = eventData.daily.events[i];
            }
            break;
        case 2:
            document.getElementById("statsTable").classList.remove("d-none");
            len = statsData.hourly.dates.length;
            table = document.getElementById("statsTableBody");
            table.innerHTML = "";
            for(let i = 0; i < len; i++) {
                let row = table.insertRow(-1);
                let cell = row.insertCell(-1);
                cell.innerHTML = statsData.hourly.dates[i];
                cell = row.insertCell(-1);
                cell.innerHTML = parseInt(statsData.hourly.impressions[i] * 1000);
                cell = row.insertCell(-1);
                cell.innerHTML = statsData.hourly.clicks[i];
                cell = row.insertCell(-1);
                cell.innerHTML = statsData.hourly.revenue[i];
            }
            break;
        case 3:
            document.getElementById("statsTable").classList.remove("d-none");
            len = statsData.daily.dates.length;
            table = document.getElementById("statsTableBody");
            table.innerHTML = "";
            for(let i = 0; i < len; i++) {
                let row = table.insertRow(-1);
                let cell = row.insertCell(-1);
                cell.innerHTML = statsData.daily.dates[i];
                cell = row.insertCell(-1);
                cell.innerHTML = parseInt(statsData.daily.impressions[i] * 1000);
                cell = row.insertCell(-1);
                cell.innerHTML = statsData.daily.clicks[i];
                cell = row.insertCell(-1);
                cell.innerHTML = statsData.daily.revenue[i];
            }
            
            break;
        case 4:
            document.getElementById("poiTable").classList.remove("d-none");
            len = poiData.ids.length;
            table = document.getElementById("poiTableBody");
            table.innerHTML = "";
            for(let i = 0; i < len; i++) {
                let row = table.insertRow(-1);
                let cell = row.insertCell(-1);
                cell.innerHTML = poiData.ids[i];
                cell = row.insertCell(-1);
                cell.innerHTML = poiData.names[i];
                cell = row.insertCell(-1);
                cell.innerHTML = poiData.lats[i];
                cell = row.insertCell(-1);
                cell.innerHTML = poiData.lons[i];
            }
            break;
        
        default: break;
    }
}