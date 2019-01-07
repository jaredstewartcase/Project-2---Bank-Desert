setTimeout(function () {

    d3.csv('LA_Locations.csv').then(location_data => {
        d3.json("neighborhood_coordinates.json").then(neighborhood_data => {
            //console.log(location_data);
            //console.log(neighborhood_data);
            matchingArray = []
            location_data.forEach(function (hood) {
                var hoodname = hood["LA Neighborhood"];
                var hoodincome = (+hood['Median Income']);
                for (var i = 0; i < neighborhood_data.features.length; i++) {
                    var jsonname = neighborhood_data.features[i].properties.name;
                    var geometry = ([neighborhood_data.features[i].geometry.coordinates[0][0]]);
                    if (hoodname === jsonname) {
                        var color = {}
                        color["hood"] = hoodname;
                        color["coords"] = geometry;
                        color["income"] = hoodincome;
                        matchingArray.push(color)
                        console.log(color);
                        break;
                    }
                }
            });
            //console.log(matchingArray);
        });
    });

    d3.json('neighborhood_coordinates.json').then(data => {
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
            // Style each feature (in this case a neighborhood)
            style: function (feature) {
                return {
                    color: "black",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },
            // Called on each feature
            onEachFeature: function (feature, layer) {
                // Set mouse events to change map styling
                layer.on({
                    // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.75,
                            color: "white"
                        });
                    },
                    // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5,
                            color: "black"
                        });
                    },
                    // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
                    click: function (event) {
                        myMap.fitBounds(event.target.getBounds());
                    }
                });
                // Giving each feature a pop-up with information pertinent to it
                layer.bindPopup("<h1>" + feature.properties.name);
            }
        }).addTo(myMap);
    });

    var hood = [];
    var names = [];
    var coord = [];

    var althood = [];
    var altnames = [];
    var altcoord = [];

    var bank_locations = [];
    var alt_bank_locations = [];

    var bankClusters = L.markerClusterGroup(
        {
            disableClusteringAtZoom: 12,
        }
    );

    var altbankClusters = L.markerClusterGroup(
        {
            disableClusteringAtZoom: 12,
        }
    );

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

    for (var i = 0; i < hood.length; i++) {

        var myIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        });

        var bank1 = L.marker(([coord[i][0], coord[i][1]]),
            { icon: myIcon }
        ).bindPopup("<h3>" + "Bank Name: " + names[i] + "<br>" + "<h3>" + "LA Neighborhood: " + hood[i]);
        bank_locations.push(bank1);
        bankClusters.addLayer(bank1);
    };

    for (var i = 0; i < althood.length; i++) {

        var myIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        });
        var altbank1 = L.marker(([altcoord[i][0], altcoord[i][1]]),
            { icon: myIcon }
        ).bindPopup("<h3>" + "Alternative Bank Name: " + altnames[i] + "<br>" + "<h3>" + "LA Neighborhood: " + althood[i]);
        alt_bank_locations.push(altbank1);
        altbankClusters.addLayer(altbank1);
    };

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "mapbox.streets",
        accessToken: API_KEY
    })


    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Street Map": streetmap,
    };

    // Create an overlayMaps object to hold the bank cluster layer.
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

}, 10000);