const kickstarterPledge = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

const movieSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

const videoGameSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'


const pledgeApiCall = () => {
return fetch(kickstarterPledge)
.then((response) => response.json())
}

const movieApiCall = () => {
return fetch(movieSales)
.then((response) => response.json())
}

const gameApiCall = () => {
return fetch(videoGameSales)
.then((response) => response.json())
}

const movieColours = {
  'Action' : 'red',
'Adventure' : 'orange',
'Comedy' : 'yellow',
'Drama' : 'green',
'Animation' : 'brown',
'Family' : 'teal',
'Biography' : 'gold'
}

const w = 1000;
const h = 700;

const svg = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

const drawTree = (pledges, movies, games) => {
  let sortedElements = d3.hierarchy(movies, (attr) => {
    return attr.children
  }).sum((node) => {
    return node.value
  }).sort((first, second) => {
    return first - second
  })

  let getCoordinates = d3.treemap().size([w, h])

  getCoordinates(sortedElements)

  console.log(sortedElements.leaves())

  let tile = svg.selectAll("g")
                .data(sortedElements.leaves())
                .enter()
                .append("g")
                .attr("transform", (item) => {
                  return "translate(" + item.x0 + ', ' + item.y0 + ')'
                })


  tile.append("rect")
      .attr("class", "tile")
      .attr("data-name", (item) => {
        return item.data.name
  })
      .attr("data-category", (item) => {
        return item.data.category
  })
      .attr("data-value", (item) => {
        return item.data.value
  })
      .attr("width", (item) => {
                  return item.x1 - item.x0
                })
                .attr("height", (item) => {
                  return item.y1 - item.y0
                })
                .attr("fill", (item) => {
        return movieColours[item.data.category]
  })
}


async function runProgram () {
  let pledgeResponse = await pledgeApiCall();
  let movieResponse = await movieApiCall();
  let gameResponse = await gameApiCall();
  drawTree(pledgeResponse, movieResponse, gameResponse);
  // console.log(movieResponse)
}




runProgram()
