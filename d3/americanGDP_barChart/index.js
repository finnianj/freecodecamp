function apiCall() {
  return fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then((response) => response.json());
}

const w = 500;
const h = 500;
const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const tooltip = d3.select("#container")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .attr("data-date", 1)
      .style("opacity", 0);

async function getData() {
  console.log('calling');
  const result = await apiCall();
  const padding = 50;
  var parseTime = d3.timeParse("%Y-%m-%d");

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(result.data, (d) => d[1])])
  .range([h - padding, padding]);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
   .attr("transform", "translate("+ padding + ", 0)")
   .attr("id", "y-axis")
   .call(yAxis);

  const xScale = d3.scaleTime()
  .domain([d3.min(result.data, (d) => parseTime(d[0])), d3.max(result.data, (d) => parseTime(d[0]))])
  .range([padding, w - padding, ]);

  const xAxis = d3.axisBottom(xScale);
  svg.append("g")
   .attr("transform", "translate(0, " + (h - padding) + ")")
   .attr("id", "x-axis")
   .call(xAxis);

    svg.selectAll("rect")
       .data(result.data)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("data-date", (d) => (d[0]))
       .attr("data-gdp", (d) => d[1])
       .attr("x", (d) => xScale(parseTime(d[0])))
       .attr("y",(d) => yScale(d[1]))
       .attr("width", 1)
       .attr("height", (d, i) => h - yScale(d[1]) - padding)
       .on('mouseover', function (e, d) {
        tooltip
          .attr("data-date", d[0]);
           tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(d[0]);
      })
      .on("mouseout", function() {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
      });
}

getData();
