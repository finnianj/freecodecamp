
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

const w = 1500;
const h = 700;

const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const makeMap = (counties, education) => {
  console.log(counties)
  console.log(education)

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
          return "red"
        } else if (percent <= 20) {
          return "tomato"
        } else if (percent <= 30) {
          return "orange"
        } else if (percent <= 40) {
          return "yellow"
        } else {
          return "lime"
        }
  })

}

async function runProgram () {
  let countyResponse = await countyApiCall();
  education = await educationApiCall();
  counties = topojson.feature(countyResponse, countyResponse.objects.counties).features
  makeMap(counties, education);

}




runProgram()
