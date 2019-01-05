// Get data 

data = d3.csv("../Scraping/LA_Locations.csv", function(data){ processData(data) } );

console.log(data)


// function makeplot() {
//     Plotly.d3.csv("../Scraping/LA_Locations.csv", function(data){ processData(data) } );
  
//   };
  
//   function processData(allRows) {
  
//     console.log(allRows);
//     var x = [], y = [], standard_deviation = [];
  
//     for (var i=0; i<allRows.length; i++) {
//       row = allRows[i];
//       x.push( row['AAPL_x'] );
//       y.push( row['AAPL_y'] );
//     }
//     console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
//     makePlotly( x, y, standard_deviation );
//   }
  
//   function makePlotly( x, y, standard_deviation ){
//     var plotDiv = document.getElementById("plot");
//     var traces = [{
//       x: x,
//       y: y
//     }];
  
//     Plotly.newPlot('myDiv', traces,
//       {title: 'Plotting CSV data from AJAX call'});
//   };
//     makeplot();


// // Create the Traces
// var trace1 = {
//     x: data.year,
//     y: data.high_jump,
//     mode: "markers",
//     type: "scatter",
//     name: "high jump",
//     marker: {
//       color: "#2077b4",
//       symbol: "hexagram"
//     }
//   };
  
//   var trace2 = {
//     x: data.year,
//     y: data.discus_throw,
//     mode: "markers",
//     type: "scatter",
//     name: "discus throw",
//     marker: {
//       color: "orange",
//       symbol: "diamond-x"
//     }
//   };
  
//   var trace3 = {
//     x: data.year,
//     y: data.long_jump,
//     mode: "markers",
//     type: "scatter",
//     name: "long jump",
//     marker: {
//       color: "rgba(156, 165, 196, 1.0)",
//       symbol: "cross"
//     }
//   };
  
//   // Create the data array for the plot
//   var data = [trace1, trace2, trace3];
  
//   // Define the plot layout
//   var layout = {
//     title: "Olympic trends over the years",
//     xaxis: { title: "Year" },
//     yaxis: { title: "Olympic Event" }
//   };
  
//   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("plot", data, layout);
  