


//pull data from csv - d3.csv - needs function ("../Scraping/LA_Locations.csv")

//switch - dropdown 
//case - data for each plot: 

//Plot 1
// for each neighborhood - set up an array? 
//median income - from CSV
//number of alt banks from CSV  
//number of reg banks? from CSV
//sort by M.I.

//Plot 2
// for each neighborhood
//diversity index - from CSV
//number of alt banks from CSV
//number of reg banks? from CSV
//sort by DI

//Plot 3
// for each neighborhood 
//population density - from CSV
//number of alt banks - from CSV?
//number of reg banks? from CSV
//sort by pd



//   setTimeout(function () {


    var hood = [];
    var median = []; 
    var diversity = []; 
    var popDensity = []; 
    var bankCount = [];
    var altBankCount = [];
    
    
    
    function makeplot() {
        Plotly.d3.csv("LA_Locations.csv", function (data) {
            processData(data)
        }
        );
    
    };
    
    function processData(allRows) {
    
        console.log(allRows);
        // var x = [], y = [];
    
        var hood = [];
        var median = []; 
        var diversity = []; 
        var popDensity = []; 
        var bankCount = [];
        var altBankCount = [];
        
    
        for (var i = 0; i < allRows.length; i++) {
            row = allRows[i];
            // x.push(row['LA Neighborhood']);
            // y.push(row['Alt Bank Count']);
        
            hood.push(row['LA Neighborhood']);
            median.push(row['Median Income']);
        }
        console.log('LA Neighborhood', hood, 'Median Income', median);
        makePlotly(hood, median);
    }
    
    function makePlotly(x, y) {
        var plotDiv = document.getElementById("plot");
        var traces = [{
            x: x,
            y: y
        }];
    
        Plotly.newPlot('plots', traces,
            { title: 'Test Plot' });
    };
    makeplot();
    
    
    
        // bank_data.forEach(bank => {
        //   Object.entries(bank).forEach(([key, value]) => {
        //       if (key === 'bank_hood') {
        //           var bankhood = value;
        //           hood.push(bankhood);
        //       }
        //       else if (key === 'bank_name') {
        //           var bankname = value;
        //           names.push(bankname);
        //       }
        //       else if (key === 'bank_lat_lng') {
        //           var banklat = value[0];
        //           var banklng = value[1];
        //           coord.push([banklat, banklng]);
        //       }
        //   });
        // });
    
        // altbank_data.forEach(altbank => {
        //   Object.entries(altbank).forEach(([key, value]) => {
        //       if (key === 'altbank_hood') {
        //           var altbankhood = value;
        //           althood.push(altbankhood);
        //           //console.log(bankhood);
        //       }
        //       else if (key === 'altbank_name') {
        //           var altbankname = value;
        //           altnames.push(altbankname);
        //           //console.log(bankname);
        //       }
        //       else if (key === 'altbank_lat_lng') {
        //           var altbanklat = value[0];
        //           var altbanklng = value[1];
        //           altcoord.push([altbanklat, altbanklng]);
        //       }
        //   });
        // });
    
        // function init() {
        //   var data = [
        //     {
        //       y: hood,
        //       type: 'bar',
        //       sort: 'descending',
        //     marker: {
        //       color: 'blue',
        //     },
        //     }
        //   ];
        //   var LINE = document.getElementById("plot");
        //   Plotly.plot(LINE, data);
        // }
    
        // function updatePlotly(newy) {
        //   var LINE = document.getElementById("plot");
    
        //   // Note the extra brackets around 'newx' and 'newy'
        //   Plotly.restyle(LINE, "y", [newy]);
        // }
    
        // function getData(dataset) {
    
        //   // Initialize empty arrays to contain our axes
        //   var y = [];
    
        //   // Fill the x and y arrays as a function of the selected dataset
        //   switch (dataset) {
        //     case "Neighborhood Banks":
        //       y = hood;
        //       break;
        //     case "Neighborhood Alt Banks":;
        //       y = althood;
        //       break;
        //   }
    
        //   updatePlotly(y);
        // }
    
        // init();
    
        // }, 1500);
    