// MAP JS
// Functions for data maps 

function fetchDataForMap() {
    Promise.all([
        fetch("https://proximal-ring-pipe.glitch.me/events/hourly").then(data =>  {return data.json()})
        .then(data => {
            mapData.eventhourly = data;
            
        })
        .catch(err => console.log(err)),
        fetch("https://proximal-ring-pipe.glitch.me/events/daily").then(data =>  {return data.json()})
        .then(data => {
            mapData.eventdaily = data;
            
        })
        .catch(err => console.log(err)),
        fetch("https://proximal-ring-pipe.glitch.me/stats/hourly").then(data =>  {return data.json()})
        .then(data => {
            mapData.stathourly = data;
            
        })
        .catch(err => console.log(err)),
        fetch("https://proximal-ring-pipe.glitch.me/stats/daily").then(data =>  {return data.json()})
        .then(data => {
            mapData.statdaily = data;
            
        })
        .catch(err => console.log(err)),
        fetch("https://proximal-ring-pipe.glitch.me/poi").then(data =>  {return data.json()})
        .then(data => {
            mapData.poi = data;
        })
        .catch(err => console.log(err)),
    ])
    .then(() => {
        console.log("data is fetched!");
        plotMap(joinData(mapData.stathourly, mapData.poi));
    })
}


function joinData(itemOne, itemTwo) {
    let dataJoin = [];
       
        for(let i = 0; i < itemOne.length; i++) {
            for(let j = 0; j < itemTwo.length; j++) {
                dataJoin.push({
                    ...itemOne[j],
                    ...itemTwo[i]
                })
            }
        }
    return dataJoin;
}


function plotMap(data) {

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#myMap")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 1000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.revenue); } )
      .attr("cy", function (d) { return y(d.impressions); } )
      .attr("r", 5)
    

}