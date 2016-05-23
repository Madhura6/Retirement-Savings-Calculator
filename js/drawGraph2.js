   function plotChart(data){
$("#chart").empty();
var margin = {
    top: 40,
    right: 80,
    bottom: 70,
    left: 150
},
width = 780 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.time.scale()
    .domain(d3.extent(data, function(d) { return d.Date; }))
    .range([0, width]);
        
var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
var amounts = data;

var minX = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.Date; }) });
var maxX = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.Date; }) });
var minY = d3.min(data, function (kv) { return d3.min(kv.Data, function (d) { return d.Value; }) });
var maxY = d3.max(data, function (kv) { return d3.max(kv.Data, function (d) { return d.Value; }) });

var mindate = new Date(minX.toString());
var maxdate = new Date(maxX.toString());

x.domain([mindate, maxdate]);
y.domain([minY, maxY]);


function getDate(d) {
    return new Date(d.Date.toString());
}

var line = d3.svg.line()
    .interpolate("basis")
     .x(function (d) { return x(getDate(d)); })
    .y(function (d) {
    return y(d.Value); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

color.domain(data.map(function (d) { return d.Amount; }));

var amount = svg.selectAll(".amount")
    .data(amounts)
    .enter().append("g")
    .attr("class", "amount");

amount.append("text")
    .datum(function (d) {
    return {
        date: d.Data[d.Data.length - 1].Date,
        value: d.Data[d.Data.length - 1].Value,
        name: d.amount
    };
})
    .attr("transform", function (d) {
    return "translate(" + x(d.date) + "," + y(d.value) + ")";
})
    .attr("x", 3)
    .attr("dy", ".25em")
    .text(function (d) {
        return d.name;
});

amount.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
    return line(d.Data);
})
    .style("stroke", function (d) {
    return color(d.Amount);
});

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,400)")
    .call(xAxis)
    .append("text")
    .attr("x1", 0)
    .attr("x2", 100)
    .attr("dx", ".5em")
    .style("text-anchor", "end")
    .text("Calender Year");
       
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".55em")
    .style("text-anchor", "end")
    .text("Retirement Savings Value");
}