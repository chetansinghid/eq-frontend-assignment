// TABLE JS
// Functions for table


// Function to populate table as per selection
function populateTable(n) {
    currentTable = n;
    hideElementById(["eventsTable", "statsTable", "poiTable"]);
    let len = null, table = null;
    switch(n) {
        case 0: 
            document.getElementById("eventsTable").classList.remove("d-none");
            document.getElementById("searchText").placeholder = "Search dates";
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
            document.getElementById("searchText").placeholder = "Search dates";
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
            document.getElementById("searchText").placeholder = "Search dates";
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
            document.getElementById("searchText").placeholder = "Search dates";
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
            document.getElementById("searchText").placeholder = "Search POI names";
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

// Function to update cell styling for search text
// called over each entry on search bar
// callback for searchbar input
function updateVal() {
    let searchString = document.getElementById("searchText").value;
    
    if(searchString !== "") {
        let data;
        let table;
        switch(currentTable) {
            case 0: 
            case 1:
                table = document.getElementById("eventsTableBody").getElementsByTagName("td");
                for(let i = 0; i < table.length; i++) {
                    if(match(searchString, table[i].innerHTML)) {
                        console.log(1);
                        table[i].style.background = "yellow";
                    }
                }
                break;
            case 2:
            case 3: 
                table = document.getElementById("statsTableBody").getElementsByTagName("td");
                for(let i = 0; i < table.length; i++) {
                    if(match(searchString, table[i].innerHTML)) {
                        console.log(1);
                        table[i].style.background = "yellow";
                    }
                }
                break;
            case 4: 
                table = document.getElementById("poiTableBody").getElementsByTagName("td");
                
                for(let i = 0; i < table.length; i++) {
                    if(match(searchString, table[i].innerHTML)) {
                        console.log(1);
                        table[i].style.background = "yellow";
                    }
                }
                break;
            default: break;
        }
        
    }
    if(document.getElementById("searchText").value === "") {
        console.log("empty");
        populateTable(currentTable);
        
    }
}

// Fuzzy search method

function match(search, text) {
    search = search.toUpperCase();
    text = text.toUpperCase();

    var j = -1; // remembers position of last found character

    // consider each search character one at a time
    for (var i = 0; i < search.length; i++) {
        var l = search[i];
        if (l == ' ') continue;     // ignore spaces

        j = text.indexOf(l, j+1);     // search for character & update position
        if (j == -1) return false;  // if it's not found, exclude this item
    }
    return true;
}