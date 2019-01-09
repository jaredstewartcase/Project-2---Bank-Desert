
// var margin = {top: 20, right: 20, bottom: 30, left: 40},
// width = 1200 - margin.left - margin.right,
// height = 900 - margin.top - margin.bottom;

// /* 
// * value accessor - returns the value to encode for a given data object.
// * scale - maps value to a visual display encoding, such as a pixel position.
// * map function - maps from data value to display value
// * axis - sets up axis
// */ 

// // setup x 
// var xValue = function(d) { return d["Median Income "];}, // data -> value
// xScale = d3.scale.linear().range([0, width]), // value -> display
// xMap = function(d) { return xScale(xValue(d));}, // data -> display
// xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// // setup y
// var yValue = function(d) { return d["Alt Bank Count"];}, // data -> value
// yScale = d3.scale.linear().range([height, 0]), // value -> display
// yMap = function(d) { return yScale(yValue(d));}, // data -> display
// yAxis = d3.svg.axis().scale(yScale).orient("left");

// // setup fill color
// color = "red";

// // add the graph canvas to the body of the webpage
// var svg = d3.select("body").append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
// .attr("class", "tooltip")
// .style("opacity", 0);

// // load data
// d3.csv("LA_locations.csv", function(error, data) {

// // change string (from CSV) into number format
// data.forEach(function(d) {
// d["Alt Bank Count"] = +d["Alt Bank Count"];
// d["Median Income"] = +d["Median Income"];
// //    console.log(d);
// });

// // don't want dots overlapping axis, so add in buffer to data domain
// xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
// yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

// // x-axis
// svg.append("g")
//   .attr("class", "x axis")
//   .attr("transform", "translate(0," + height + ")")
//   .call(xAxis)
// .append("text")
//   .attr("class", "label")
//   .attr("x", width)
//   .attr("y", -6)
//   .style("text-anchor", "end")
//   .text("Median Income");

// // y-axis
// svg.append("g")
//   .attr("class", "y axis")
//   .call(yAxis)
// .append("text")
//   .attr("class", "label")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 6)
//   .attr("dy", ".71em")
//   .style("text-anchor", "end")
//   .text("Alt Bank Count");

// // draw dots
// svg.selectAll(".dot")
//   .data(data)
// .enter().append("circle")
//   .attr("class", "dot")
//   .attr("r", 3.5)
//   .attr("cx", xMap)
//   .attr("cy", yMap)
//   .style("fill", "blue") 
//   .on("mouseover", function(d) {
//       tooltip.transition()
//            .duration(200)
//            .style("opacity", .9);
//       tooltip.html(d["LA Neighborhood"] + "<br/> (" + xValue(d) 
//         + ", " + yValue(d) + ")")
//            .style("left", (d3.event.pageX + 5) + "px")
//            .style("top", (d3.event.pageY - 28) + "px");
//   })
//   .on("mouseout", function(d) {
//       tooltip.transition()
//            .duration(500)
//            .style("opacity", 0);
//   });

//   chartGroup.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 0 - margin.left + 40)
//   .attr("x", 0 - (height / 2))
//   .attr("dy", "1em")
//   .attr("class", "axisText")
//   .text("# of alt banks");

// chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//   .attr("class", "axisText")
//   .text("Median Income");

// });



function errorHandle(error) {
    throw error;
  } 
  
 d3.csv("LA_Locations.csv").then(successHandle, errorHandle);

 function successHandle(hoodData) {
    
    for (var i = 0; i < hoodData.length; i++) {
    row = hoodData[i];
    hood = row['LA Neighborhood']; 
    median = +row['Median Income'].replace("$", "").replace(",", "").replace(" ", ""); 
    altBankCount = +row['Alt Bank Count']; 
    bankCount = +row['Bank Count']; 
    diversity = +row['Diversity Index']; 
    };

  console.log(median); 

    var trace1 = {
      type: "scatter",
    //   mode: "lines",
      name: hood,
      x: median,
      y: altBankCount,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `test`,
      xaxis: {
        range: [0, 25000],
        type: "currency"
      },
      yaxis: {
        range: [0, 40], 
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

}
