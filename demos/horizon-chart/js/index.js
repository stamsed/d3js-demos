var width = 960,
    height = 500;

var chart = d3.horizon()
    .width(width)
    .height(height)
    .bands(1)
    .mode("mirror")
    .interpolate("basis");

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/unemployment.json", function(error, data) {

  // Offset so that positive is above-average and negative is below-average.
  var mean = data.rate.reduce(function(p, v) { return p + v; }, 0) / data.rate.length;

  // Transpose column values to rows.
  data = data.rate.map(function(rate, i) {
    return [Date.UTC(data.year[i], data.month[i] - 1), rate - mean];
  });

  // Render the chart.
  svg.data([data]).call(chart);

  // Enable mode buttons.
  d3.selectAll("#horizon-controls input[name=mode]").on("change", function() {
    svg.call(chart.duration(0).mode(this.value));
  });

  // Enable bands buttons.
  d3.selectAll("#horizon-bands button").data([-1, 1]).on("click", function(d) {
    var n = Math.max(1, chart.bands() + d);
    d3.select("#horizon-bands-value").text(n);
    svg.call(chart.duration(1000).bands(n).height(height / n));
  });
});