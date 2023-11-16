// var width = 500
// var height= 400

var svg = d3.select("#group")
  .style("width", width)
  .style("height", height)

  d3.csv("genre_stats.csv", function (data) {
    data.forEach(function (d) {
      d["Domestic gross ($million)"] = +d["Domestic gross ($million)"];
      d["Foreign Gross ($million)"] = +d["Foreign Gross ($million)"];
    });

  const margin = {top: 20, right: 30, bottom: 50, left: 40};
  const width =  600 -margin.left - margin.right;
  const height = 500- margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Primary_Genre))
    .rangeRound([0, width])
    .paddingInner(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d["Domestic gross ($million)"], d["Foreign Gross ($million)"]))])
    .range([height, 0]);

  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  chart.selectAll(".domestic-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "domestic-bar")
    .attr("x", d => xScale(d.Primary_Genre))
    .attr("y", d => yScale(d["Domestic gross ($million)"]))
    .attr("width", xScale.bandwidth() / 2)
    .attr("height", d => height - yScale(d["Domestic gross ($million)"]))
    .style("fill", "#C8A2C8");

  chart.selectAll(".foreign-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "foreign-bar")
    .attr("x", d => xScale(d.Primary_Genre) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d["Foreign Gross ($million)"]))
    .attr("width", xScale.bandwidth() / 2)
    .attr("height", d => height - yScale(d["Foreign Gross ($million)"]))
    .style("fill", "#7A5DC7");

  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(data.length));

  chart.append("g")
    .call(d3.axisLeft(yScale));

  chart.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom / 2)
    .attr("text-anchor", "middle")
    .text("Genres");

  chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left)
    .attr("text-anchor", "middle")
    .text("Millions");

  const legend = chart.append("g")
    .attr("transform", `translate(${width - margin.right}, 0)`);

  legend.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", "#C8A2C8");

  legend.append("text")
    .attr("x", 25)
    .attr("y", 19)
    .text("Domestic Gross");

  legend.append("rect")
    .attr("x", 10)
    .attr("y", 30)
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", "#7A5DC7");

  legend.append("text")
    .attr("x", 25)
    .attr("y", 39)
    .text("Foreign Gross");
});
