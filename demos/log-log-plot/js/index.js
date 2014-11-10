var margin = {top: 10, right: 245, bottom: 30, left: 255},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.log()
    .domain([0.1, 100])
    .range([0, width]);

var y = d3.scale.log()
    .domain([0.1, 100])
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(0, ".1s");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(0, ".1s");

var line = d3.svg.line();

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

d3.tsv("data/data.tsv", type, function(error, data) {
  var seriesNames = d3.keys(data[0]);

  var series = seriesNames.map(function(key) {
    return data.map(function(d) {
      return [x(d.x), y(d[key])];
    });
  });

  svg.append("g")
      .attr("class", "lines")
      .attr("clip-path", "url(#clip)")
    .selectAll("path")
      .data(series)
    .enter().append("path")
      .style("stroke", function(d, i) { return color(i); })
      .attr("d", line);

  var legend = svg.append("g")
      .attr("class", "legend")
    .selectAll("g")
      .data(seriesNames)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + (width - 60) + "," + (height - 20 - i * 20) + ")"; });

  legend.append("line")
      .style("stroke", function(d, i) { return color(i); })
      .attr("x2", 20);

  legend.append("text")
      .attr("dy", ".35em")
      .attr("x", 26)
      .text(function(d) { return "f(x) = " + d; });
});

function type(d) {
  for (var key in d) d[key] = +d[key];
  return d;
}