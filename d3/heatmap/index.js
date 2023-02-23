function apiCall() {
  return fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then((response) => response.json());
}

const w = 1500;
const h = 500;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);


async function getData() {
  console.log('calling');
  const result = await apiCall();
  const data = result.monthlyVariance;
  const padding = 70;
  const parseTime = d3.timeParse("%Y");
  // const parseMins = d3.timeParse("%M:%S")
  // const timeFormat = d3.timeFormat("%M:%S");

  console.log(data)

  const xScale = d3.scaleTime()
    .domain([d3.min(data, (d) => parseTime(d.year)), d3.max(data, (d) => parseTime(d.year))])
    .range([padding, w - padding]);

  const xAxis = d3.axisBottom(xScale);

  svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis);

   const yScale = d3.scaleBand()
  .domain(months)
  .range([h - padding, padding]);


  const yAxis = d3.axisLeft(yScale).ticks(12);

  svg.append("g")
   .attr("transform", "translate("+ padding + ", 0)")
   .attr("id", "y-axis")
   .call(yAxis);

  svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("class", "cell")
       .attr("x", (d) => xScale(parseTime(d.year)))
       .attr("y",(d) => yScale(months[d.month - 1]))
       .attr("width", (w-padding-padding)/(data.length / 12))
       .attr("height", (h - padding - padding) /12)
       .attr("data-year", (d) => d.year)
       .attr("data-month", (d) => d.month - 1)
       .attr("data-temp", (d) => d.variance)
       .attr("fill", (d) => {
    let temp = d.variance
   if (temp < - 3) { return "#1467ff" } else
if (temp < - 2) { return "#14c0ff" } else
if (temp < - 1) { return "#14ffdc" } else
    if (temp < 0) { return "#d0ff14" } else
if (temp < 1) { return "#ffc414" } else
if (temp < 1.8) { return "#ff7614" } else
 if (temp < 10) { return "#ff1414" }
  })


}

getData();
