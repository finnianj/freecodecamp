
const countyData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"

const educationData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let counties
let education

const countyApiCall = () => {
return fetch(countyData)
.then((response) => response.json())
}

const educationApiCall = () => {
return fetch(educationData)
.then((response) => response.json())
}

const w = 1000;
const h = 700;

const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const tooltip = d3.select("#info")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .attr('style', 'position: absolute; opacity: 0;');

const makeMap = (counties, education, states) => {

  svg.selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("class", "county")
      .attr("fill", (countyItem) => {
        let id = countyItem.id
        let county = education.find((item) => {
          return item.fips == id
        })
        let percent = county.bachelorsOrHigher
        if (percent <= 10) {
          return "#D61355"
        } else if (percent <= 15) {
          return "tomato"
        } else if (percent <= 20) {
          return "orange"
        } else if (percent <= 25) {
          return "#FDD36A"
        } else if (percent <= 30) {
          return "#C9F4AA"
        } else {
          return "#38E54D"
        }})
      .attr("data-fips", (countyItem) => {
        return countyItem.id
      })
      .attr("data-education", (countyItem) => {
        let id = countyItem.id
        let county = education.find((item) => {
          return item.fips == id
        })
        return county.bachelorsOrHigher
      })
      .on('mouseover', (event) => {
      let fips = event.target.attributes['data-fips'].value
      let countyName = education.find((item) => {
          return item.fips == fips
        })
      let percent = event.target.attributes['data-education'].value
      console.log(countyName)
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY + 'px')
        tooltip
          .attr("data-education", percent)
          .attr("name", countyName.area_name)
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(countyName.area_name + " " + percent + "%");
  })
        .on("mouseout", function(d) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
      })

      svg.selectAll("states")
      .data(states)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("class", "state")
      .attr("stroke", "black")
      .attr("fill", "none")
  };

async function runProgram () {
  let countyResponse = await countyApiCall();
  education = await educationApiCall();
  counties = topojson.feature(countyResponse, countyResponse.objects.counties).features
  let states = topojson.feature(countyResponse, countyResponse.objects.states).features
  console.log(states)
  makeMap(counties, education, states);
}




runProgram()
