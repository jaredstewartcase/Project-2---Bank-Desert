setTimeout(function () {

var hood = [];
var names = [];
var coord = [];

var althood = [];
var altnames = [];
var altcoord = [];

bank_data.forEach(bank => {
  Object.entries(bank).forEach(([key, value]) => {
      if (key === 'bank_hood') {
          var bankhood = value;
          hood.push(bankhood);
      }
      else if (key === 'bank_name') {
          var bankname = value;
          names.push(bankname);
      }
      else if (key === 'bank_lat_lng') {
          var banklat = value[0];
          var banklng = value[1];
          coord.push([banklat, banklng]);
      }
  });
});

altbank_data.forEach(altbank => {
  Object.entries(altbank).forEach(([key, value]) => {
      if (key === 'altbank_hood') {
          var altbankhood = value;
          althood.push(altbankhood);
          //console.log(bankhood);
      }
      else if (key === 'altbank_name') {
          var altbankname = value;
          altnames.push(altbankname);
          //console.log(bankname);
      }
      else if (key === 'altbank_lat_lng') {
          var altbanklat = value[0];
          var altbanklng = value[1];
          altcoord.push([altbanklat, altbanklng]);
      }
  });
});

function init() {
  var data = [
    {
      y: hood,
      type: 'histogram',
      sort: 'descending',
    marker: {
      color: 'blue',
    },
    }
  ];
  var LINE = document.getElementById("plot");
  Plotly.plot(LINE, data);
}

function updatePlotly(newy) {
  var LINE = document.getElementById("plot");

  // Note the extra brackets around 'newx' and 'newy'
  Plotly.restyle(LINE, "y", [newy]);
}

function getData(dataset) {

  // Initialize empty arrays to contain our axes
  var y = [];

  // Fill the x and y arrays as a function of the selected dataset
  switch (dataset) {
    case "Neighborhood Banks":
      y = hood;
      break;
    case "Neighborhood Alt Banks":;
      y = althood;
      break;
  }

  updatePlotly(y);
}

init();

}, 15000);
