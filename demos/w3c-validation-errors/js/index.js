var margin = {top: 30, right: 10, bottom: 10, left: 30},
    width = 960 - margin.left - margin.right,
    height = 1950 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/errors.json", function(errors) {
  errors.sort(function(a, b) { return b.value - a.value; });

  // Set the scale domain.
  x.domain([0, d3.max(errors, function(d) { return d.value; })]);
  y.domain(d3.range(errors.length));

  svg.selectAll(".value")
      .data(errors)
    .enter().append("rect")
      .attr("class", "value")
      .attr("y", function(d, i) { return y(i); })
      .attr("width", function(d) { return x(d.value); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
    .call(d3.svg.axis()
      .scale(x)
      .orient("top")
      .ticks(12)
      .tickSize(-height));

  svg.selectAll(".name")
      .data(errors)
    .enter().append("text")
      .attr("class", "name")
      .attr("x", 6)
      .attr("y", function(d, i) { return y(i) + y.rangeBand() / 2; })
      .attr("dx", -3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  svg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("y2", height);
});