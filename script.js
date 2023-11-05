// Set the dimensions for the chart
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Select the SVG container and set its dimensions
const svg = d3.select("#doughnut-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Load data from a CSV file
d3.csv("Moviesdata2020.csv").then(data => {
    // Define a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    

    // Define the pie layout
    const pie = d3.pie()
        .value(d => d.value);

    // Generate the arc data
    const arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius);

    // Create a g element for each data point
    const g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // Append the path elements
    g.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.label));

    // Add labels
    g.append("drama")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.label);

    
    g.append("romance")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.label);
    
    
    g.append("comedy")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.label);
});
