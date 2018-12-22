d3.json("neighborhood_coordinates.json", function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Style each feature (in this case a neighborhood)
        style: function (feature) {
            return {
                color: "black",
                fillOpacity: 0.5,
                weight: 1.5
            };
        }
    }).addTo(myMap);

});

var bank_locations = [];
var alt_bank_locations = [];

var bankClusters = L.markerClusterGroup(
    {
        disableClusteringAtZoom: 13,
    }
);
d3.json("bank_coordinates.json", function (error, data) {
    if (error) throw error;
    data.forEach(function (bank) {
        var myIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        });
        var bank = L.marker(([bank['Bank Lat'], bank['Bank Long']]),
            { icon: myIcon}
        ).bindPopup("<h3>" + bank['Bank Name'] + "<br>" + "<h3>" + "Bank Lat: " + [bank['Bank Lat']] + "<br>" + "Bank Long: " + [bank['Bank Long']]);
        bank_locations.push(bank);
        bankClusters.addLayer(bank);
    });
});
//myMap.addLayer(bankClusters);

var altbankClusters = L.markerClusterGroup(
    {
        disableClusteringAtZoom: 13,
    }
);
d3.json("Alt_Bank.json", function (error, data) {
    if (error) throw error;
    data.forEach(function (bank) {
        var myIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        });
        var altbank = L.marker(([bank['Alt Bank Lat'], bank['Alt Bank Long']]),
            { icon: myIcon}
        ).bindPopup("<h3>" + bank['Alt Bank Name'] + "<br>" + "<h3>" + "Alt Bank Lat: " + [bank['Alt Bank Lat']] + "<br>" + "Alt Bank Long: " + [bank['Alt Bank Long']]);
        alt_bank_locations.push(altbank);
        altbankClusters.addLayer(altbank);
    });
});
//myMap.addLayer(altbankClusters);

// Adding tile layer to the map
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.streets",
    accessToken: API_KEY
})

// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
    "Street Map": streetmap
};

// Create an overlayMaps object to hold the bikeStations layer
var overlayMaps = {
    "Banks": bankClusters,
    "Alternative Banks": altbankClusters
};

var myMap = L.map("map", {
    center: [34.259395, -118.302467],
    zoom: 10,
    minZoom: 10,
    maxZoom: 20,
    layers: [streetmap, bankClusters, altbankClusters]
});

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);