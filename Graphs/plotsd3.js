
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  // Submit Button handler
  function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var testData = d3.select("#plot").node().value;
    console.log(testData);
  
    // clear the input value
    d3.select("#plot").node().value = "";
  
    // Build the plot with the new stock
    buildPlot(hoodData);
  }
  
  function buildPlot(hoodData) {
    var file = "LA_Locations.csv"
// Function is called and passes csv data
    d3.csv(file).then(successHandle, errorHandle);

        // Grab values from the response json object to build the plots
   
      for (var i = 0; i < hoodData.length; i++) {
        row = hoodData[i];
        console.log(row)
        // row.hood = row['LA Neighborhood']; 
        // row.median = +row['Median Income'].replace("$", "").replace(",", "").replace(" ", ""); 
        // row.altBankCount = +row['Alt Bank Count']; 
        // row.bankCount = +row['Bank Count']; 
        // row.diversity = +row['Diversity Index']; 
        
      };
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: median,
        y: altBankCount,
        line: {
          color: "#17BECF"
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: `Number of alt banks versus neighborhood median income`,
        xaxis: {
          range: [0, 20000]
        //   type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);
  
    };
  
  // Add event listener for submit button
  d3.select("#submit").on("click", handleSubmit);
  