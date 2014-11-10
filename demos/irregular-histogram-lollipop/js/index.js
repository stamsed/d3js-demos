var margin = {top: 10, right: 20, bottom: 20, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

d3.csv("data/income.csv", function(bins) {

  // Coerce types.
  bins.forEach(function(bin) {
    bin.Income = +bin.Income;
    bin.People = +bin.People;
  });

  // Set the scale domains.
  x.domain([0, d3.max(bins.map(function(d) { return d.Income; }))]).nice();
  y.domain([0, d3.max(bins.map(function(d) { return d.People; }))]).nice();

  // Add the bins.
  svg.selectAll(".bin")
      .data(bins)
    .enter().append("line")
      .attr("class", "bin")
      .attr("x1", function(d) { return x(d.Income); })
      .attr("x2", function(d) { return x(d.Income); })
      .attr("y1", height)
      .attr("y2", function(d) { return y(d.People); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis()
      .scale(x)
      .orient("bottom"));

  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis()
      .scale(y)
      .orient("left"));

});