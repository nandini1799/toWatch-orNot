d3.json("data.json", function(error, data) {
    if (error) throw error;
  
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  
    var svg = d3.select("#my_dataviz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
  
    var keys = ["thriller", "comedy", "horror", "romance"];
  
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Year");
  
    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Percentage");
  
    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);
  
    var stackedData = d3.stack()
      .keys(keys)
      (data);
  
    svg.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", d3.area()
          .x(function(d, i) { return x(d.data.year); })
          .y0(function(d) { return y(d[0]); })
          .y1(function(d) { return y(d[1]); })
        );
  
    // Tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
    svg.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", d3.area()
          .x(function(d, i) { return x(d.data.year); })
          .y0(function(d) { return y(d[0]); })
          .y1(function(d) { return y(d[1]); })
        )
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(d.key)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
});
