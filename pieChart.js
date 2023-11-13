
//count total column entries
async function countColumnEntriesFromPath(filePath, columnIndex) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Failed to fetch the CSV file.');
        }
        
        const csvText = await response.text();
        const lines = csvText.split('\n');
        let count = 0;

        if (lines.length > 0) {
            for (let i = 1; i < lines.length; i++) {
                const columns = lines[i].split(',');
                if (columns.length > columnIndex) {
                    count++;
                }
            }
        }

        return count;
    } catch (error) {
        throw error;
    }
}

const csvFilePath = "Moviesdata2020.csv"; // Provide the actual file path
const columnIndex = 2; // Change to the desired column index (0-based)

countColumnEntriesFromPath(csvFilePath, columnIndex)
    .then(entryCount => {
        console.log('Number of entries in column:', entryCount);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
// Function to count distinct occurrences in a CSV column
    function countDistinctOccurrences(csvData, columnName) {
            const occurrences = {};
            
            for (let i = 0; i < csvData.length; i++) {
                const value = csvData[i][columnName];
                if (occurrences[value]) {
                    occurrences[value]++;
                } else {
                    occurrences[value] = 1;
                }
            }
            
            return occurrences;
        }


        Papa.parse(csvFilePath, {
            header: true,
            skipEmptyLines: true,
            download: true,
            complete: function (result) {
                const csvData = result.data;
                const columnName = "Script Type"; 

                const distinctOccurrences = countDistinctOccurrences(csvData, columnName);

                // Convert the distinct occurrences data to a JSON object
                const jsonData = {
                    distinctOccurrences: distinctOccurrences
                };

                const data = Object.entries(jsonData.distinctOccurrences).map(([label, value]) => ({ label, value }));
                
                
                // creating the pie chart using the json data created above
                
                const radius = Math.min(width, height) / 2;
                var margin = {top: 40, right: 20, bottom: 10, left: 40}
                const colorScale = d3.scaleOrdinal().range(["#FF5733", "#345EFF", "#56A8A2", "#FFD733", "#7C36FF", "#E036FF"])
                    .domain(data.map(d => d.label));
                    // .range(d3.schemeCategory10);
                
                const svg = d3.select("#pieChart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);
                    

                const g = svg.append("g")
                .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

                const pie = d3.pie()
                    .value(d => d.value);

                const arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                const arcs = g.selectAll("arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");

                arcs.append("path")
                    .attr("d", arc)
                    .attr("fill", d => colorScale(d.data.label));

               
                arcs.append("text")
                    .attr("class", "label-text")
                    .attr("transform", d => {
                        const centroid = arc.centroid(d);
                        return `translate(${centroid[0]}, ${centroid[1]})`;
                    })
                    .attr("dy", "0.35em")
                    .text(d => `${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(0)}%`)
                    .style("text-anchor", "middle");


                // Create a legend on the side of the pie chart
                const legend = d3.select("#legend")
                                .attr("transform", `translate(${width + margin.left + margin.right}, ${margin.top})`);

                const legendItems = legend.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", (d, i) => `translate(10, ${i * 20 + 20})`);

                legendItems.append("rect")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("fill", d => colorScale(d.label));

                legendItems.append("text")
                    .attr("x", 20)
                    .attr("y", 20)
                    .attr("class", "legend")
                    .text(d => d.label)
                    .text(d => `${d.label} (${((d.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(2)}%)`)
                    .attr("font-family", "Georgia, 'Times New Roman', Times, serif");
                
                svg.append("text")
                    .attr("x", 0)
                    .attr("y", radius + margin.bottom ) // value for the vertical position
                    .attr("text-anchor", "middle")
                    .text("Script Distribution")
                    .attr("font-family", "Georgia, 'Times New Roman', Times, serif")
                    .attr("font-size", "14px");
                
            }
        });

        
    