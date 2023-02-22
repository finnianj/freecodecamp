function apiCall() {
  return fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then((response) => response.json());
}

const w = 500;
const h = 500;
const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const tooltip = d3.select("#info")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

async function getData() {
  console.log('calling');
  const result = await apiCall();
  const padding = 50;
  const parseTime = d3.timeParse("%Y");
  const parseMins = d3.timeParse("%M:%S")
  const timeFormat = d3.timeFormat("%M:%S");

  console.log(result)


  const xScale = d3.scaleTime()
  .domain([d3.min(result, (d) => parseTime(d.Year)), d3.max(result, (d) => parseTime(d.Year))])
  .range([padding, w - padding]);

  const xAxis = d3.axisBottom(xScale);
  svg.append("g")
   .attr("transform", "translate(0, " + (h - padding) + ")")
   .attr("id", "x-axis")
   .call(xAxis);

    const yScale = d3.scaleTime()
  .domain([d3.min(result, (d) => parseMins(d.Time)), d3.max(result, (d) => parseMins(d.Time))])
  .range([padding, h - padding]);

  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);
  svg.append("g")
   .attr("transform", "translate("+ padding + ", 0)")
   .attr("id", "y-axis")
   .call(yAxis);

  svg.selectAll("circle")
       .data(result)
       .enter()
       .append("circle")
       .attr("cx", (d) => xScale(parseTime(d.Year)))
       .attr("cy", (d) => yScale(parseMins(d.Time)))
       .attr("r", 5)
       .attr("class", "dot")
       .attr("data-xvalue", (d) => parseTime(d.Year) )
       .attr("data-yvalue", (d) => parseMins(d.Time) )
       .attr("fill", (d) => {
    switch (d.Nationality) {
      case "USA":
        return "red";
      case "FRA":
        return "blue";
      case "ITA":
        return "green";
      case "GER":
        return "gold";
      case "ESP":
        return "orange";
     }})
      .on('mouseover', function (e, d) {
        tooltip
          .attr("data-year", parseTime(d.Year));
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(d.Name + " - " + d.Nationality);
      })
      .on("mouseout", function(d) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
      });


  const legend = d3.select("#info")
      .append("svg")
      .attr("id", "legend")

  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", 6)
    .style("fill", "blue")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 15)
    .text("France")
    .style("font-size", "15px")
  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 25)
    .attr("r", 6)
    .style("fill", "red")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 30)
    .text("USA")
    .style("font-size", "15px")
  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 40)
    .attr("r", 6)
    .style("fill", "green")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 45)
    .text("Italy")
    .style("font-size", "15px")
  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 55)
    .attr("r", 6)
    .style("fill", "orange")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 60)
    .text("Spain")
    .style("font-size", "15px")
  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 70)
    .attr("r", 6)
    .style("fill", "gold")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 75)
    .text("Germany")
    .style("font-size", "15px")
  legend
    .append("circle")
    .attr("cx", 10)
    .attr("cy", 85)
    .attr("r", 6)
    .style("fill", "black")
  legend
    .append("text")
    .attr("x", 20)
    .attr("y", 90)
    .text("Other")
    .style("font-size", "15px")




}

getData();
