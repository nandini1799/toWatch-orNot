

// Select the svg element and set the width and height
var svg = d3.select("#chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Define the margin, x, y, and color scales
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]),
    color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// Define the x-axis and y-axis
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y).tickFormat(d3.format(".2s"));

// Append a group element to the svg and translate it by the margin
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data from the CSV file
d3.csv("average_data.csv", function(error, data) {
  if (error) throw error;

  // Convert the numeric values from strings to numbers
  data.forEach(function(d) {
    d['Budget recovered'] = +d['Budget recovered'];
    d['Budget ($million)'] = +d['Budget ($million)'];
    d['Worldwide Gross ($million)'] = +d['Worldwide Gross ($million)'];
  });

  // Extract the keys of the data (except the primary genre)
  var keys = ['Budget recovered', 'Budget ($million)', 'Worldwide Gross ($million)'];

  // Stack the data by the keys
  var stackedData = d3.stack()
      .keys(keys)(data);

  // Set the domain of the x scale by the primary genre
  x.domain(data.map(function(d) {
    return d["Primary Genre"];
  }));

  // Set the domain of the y scale by the maximum value of the stacked data
  y.domain([0, d3.max(stackedData, function(d) {
    return d3.max(d, function(d) {
      return d[1];
    });
  })]).nice();

  // Set the domain of the color scale by the keys
  color.domain(keys);

  // Append a group element for each key
  var genre = g.selectAll(".genre")
    .data(stackedData)
    .enter().append("g")
      .attr("class", "genre")
      .attr("fill", function(d) {
        return color(d.key);
      });

  // Append a rect element for each segment
  genre.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter().append("rect")
      .attr("x", function(d) {
        return x(d.data["Primary Genre"]);
      })
      .attr("y", function(d) {
        return y(d[1]);
      })
      .attr("height", function(d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth());

  // Append the x-axis to the bottom
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
      .call(xAxis);

  // Append the y-axis to the left
  g.append("g")
      .attr("class", "axis")
      .call(yAxis);

  // Append a legend to the top-right corner
  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

  // Append a rect element for each legend item
  legend.append("rect")
      .attr("x", width - margin.left - margin.right - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

  // Append a text element for each legend item
  legend.append("text")
      .attr("x", width - margin.left - margin.right - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) {
        return d;
      }).attr("font-family", "Georgia, 'Times New Roman', Times, serif");
});
