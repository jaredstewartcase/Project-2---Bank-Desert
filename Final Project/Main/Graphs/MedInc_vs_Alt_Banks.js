// Store width and height parameters to be used in later in the canvas
var svgWidth = 1200;
var svgHeight = 900;

// Set svg margins 
var margin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 90
};

// Create the width and height based svg margins and parameters to fit chart group within the canvas
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create the canvas to append the SVG group that contains the neighborhood data
// Give the canvas width and height calling the variables predifined.
var svg = d3.select("#plot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create the chartGroup that will contain the data
// Use transform attribute to fit it within the chart area
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
var file = "LA_Locations.csv"
// Function is called and passes csv data
d3.csv(file).then(successHandle, errorHandle);


// Use error handling function to append data and SVG objects
// If error exist it will be only visible in console
function errorHandle(error) {
  throw error;
} 

// Function takes in argument hoodData
function successHandle(hoodData) {

  // Loop through the data and pass argument data

   
  for (var i = 0; i < hoodData.length; i++) {
    row = hoodData[i];
    row.hood = row['LA Neighborhood']; 
    row.median = +row['Median Income'].replace("$", "").replace(",", "").replace(" ", ""); 
    row.altBankCount = +row['Alt Bank Count']; 
    row.bankCount = +row['Bank Count']; 
    row.diversity = +row['Diversity Index']; 
    
  };

  console.log(hoodData); 

  //  Create scale functions
  // Linear Scale takes the min to be displayed in axis, and the max of the data
  var xLinearScale = d3.scaleLinear()
   .domain([8.1, d3.max(hoodData, d => d.median)])

    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, 50])
    .range([height, 0]);

  // Create axis functions by calling the scale functions

  var bottomAxis = d3.axisBottom(xLinearScale)
    // Adjust the number of ticks for the bottom axis  
    .ticks(7);
  var leftAxis = d3.axisLeft(yLinearScale);



  // Append the axes to the chart group 
  // Bottom axis moves using height 
  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Left axis is already at 0,0
  // Only append the left axis 

  chartGroup.append("g")
    .call(leftAxis);
  
    var myTool = d3.select("body")
    .append("div")
    .attr("class", "mytooltip")
    .style("opacity", "0")
    .style("display", "none");


  // Create Circles for scatter plot
  var circlesGroup = chartGroup.selectAll("circle")
    .data(hoodData)
    .enter()
    .append("circle")
    
    
    .attr("cx", d => xLinearScale(d.median))
    .attr("cy", d => yLinearScale(d.altBankCount))
    .attr("r", d => d.diversity*20)
    // .attr("r", 4)
    .attr("fill", "#ffbb33")
    .attr("opacity", ".75")
    .style("font-size", "13px")
    .style("text-anchor", "middle")
  
  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Alternative Banks");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Median Income");
}
