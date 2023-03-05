const movieSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

const movieApiCall = () => {
return fetch(movieSales)
.then((response) => response.json())
}


const movieColours = {
  'Action' : '#A282D7',
  'Adventure' : '#D076B5',
  'Comedy' : '#FC839F',
  'Drama' : '#F69F80',
  'Animation' : '#FFC75F',
  'Family' : '#FFFE9F',
  'Biography' : '#71CEBE'
}

const w = 900;
const h = 500;

const svg = d3.select("#container")
  .append("svg")
  .attr("id", "canvas")
  .attr("width", w)
  .attr("height", h)



const tooltip = d3.select("#info")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .attr('style', 'position: absolute; opacity: 0;');

const drawTree = (movies) => {
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
  })            .on('mouseover', (e, d) => {
      let name = d.data.name
      let value = d.data.value
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY + 'px')
        tooltip
          .attr("data-value", value)
          .attr("data-name", name)
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(name + " - $" + value );
  })
        .on("mouseout", function(d) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
      })

  tile.append("text")
    .attr('class', 'tile-text')
    .selectAll("tspan")
    .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
    .attr("x", 4)
    .attr("y", function(d, i) { return 13 + i * 10; })
    .text(function(d) { return d; });

}


async function runProgram () {
  let movieResponse = await movieApiCall();
  drawTree(movieResponse);
}




runProgram()
