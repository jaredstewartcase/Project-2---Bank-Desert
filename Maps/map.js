d3.csv('LA_Locations.csv').then(location_data => {
    d3.json("neighborhood_coordinates.json").then(neighborhood_data => {
        matchingArray = []
        location_data.forEach(function (hood) {
            var hoodname = hood["LA Neighborhood"];
            var hoodincome = (+hood['Median Income']);
            var hoodbankcount = (+hood["Bank Count"]);
            var altbankcount = (+hood["Alt Bank Count"]);
            var medianrank = (+hood["Median Rank"]);
            for (var i = 0; i < neighborhood_data.features.length; i++) {
                var jsonname = neighborhood_data.features[i].properties.name;
                var geometry = ([neighborhood_data.features[i].geometry.coordinates[0][0]]);
                if (hoodname === jsonname) {
                    var color = {}
                    color["hood"] = hoodname;
                    color["coords"] = geometry;
                    color["income"] = hoodincome;
                    color["bankcount"] = hoodbankcount;
                    color["altbankcount"] = altbankcount;
                    color["middlerank"] = medianrank;
                    matchingArray.push(color)
                    break;
                }
            }
        });
    });
});

setTimeout(function () {

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "mapbox.streets",
        accessToken: API_KEY
    })

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

    d3.json("bank_coordinates.json").then(data => {
        for (var i = 0; i < data.length; i++) {

            var myIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            });

            var bank1 = L.marker(([data[i]["Bank Lat"], data[i]["Bank Long"]]),
                { icon: myIcon }
            ).bindPopup("<h3>" + "Bank Name: " + data[i]["Bank Name"] + "<br>" + "<h3>" + "Lat, Long: " + data[i]["Bank Lat"], data[i]["Bank Long"]);
            bank_locations.push(bank1);
            bankClusters.addLayer(bank1);
        }
    });

    d3.json("Alt_Bank.json").then(data => {
        for (var i = 0; i < data.length; i++) {

            var myIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            });
            var altbank1 = L.marker(([data[i]["Alt Bank Lat"], data[i]["Alt Bank Long"]]),
                { icon: myIcon }
            ).bindPopup("<h3>" + "Alt Bank Name: " + data[i]["Alt Bank Name"] + "<br>" + "<h3>" + "Lat, Long: " + data[i]["Alt Bank Lat"], data[i]["Alt Bank Long"]);
            alt_bank_locations.push(altbank1);
            altbankClusters.addLayer(altbank1);
        }
    });

    var medianincomelayer = [];

    for (var i = 0; i < matchingArray.length; i++) {

        polygoncoords = [];

        for (var j = 0; j < matchingArray[i].coords[0].length; j++) {
            coordinates = [matchingArray[i].coords[0][j][1], matchingArray[i].coords[0][j][0]];
            polygoncoords.push(coordinates);
        }

        var polygoncolor = "";
        if (matchingArray[i].income > 115000) {
            polygoncolor = "lightblue";
        }
        else if (matchingArray[i].income > 95000) {
            polygoncolor = "lightskyblue";
        }
        else if (matchingArray[i].income > 75000) {
            polygoncolor = "skyblue";
        }
        else if (matchingArray[i].income > 55000) {
            polygoncolor = "dodgerblue";
        }
        else if (matchingArray[i].income > 35000) {
            polygoncolor = "navy";
        }
        else {
            polygoncolor = "blue";
        }

        medianincomelayer.push(L.polygon([polygoncoords], {
            fillOpacity: 0.75,
            color: "black",
            fillColor: polygoncolor,
            weight: 1.5
        }).bindPopup("<h1>Neighborhood Name: " + matchingArray[i].hood + "</h1> <hr> <h3>Median Income Rank: " + matchingArray[i].middlerank + "</h1> <hr> <h3>Median Income: $" + matchingArray[i].income)
        );
    }

    var incomelayer = L.layerGroup(medianincomelayer);

    var countlayer = [];

    for (var i = 0; i < matchingArray.length; i++) {

        countcoords = [];

        for (var j = 0; j < matchingArray[i].coords[0].length; j++) {
            coordinates = [matchingArray[i].coords[0][j][1], matchingArray[i].coords[0][j][0]];
            countcoords.push(coordinates);
        }

        var countcolor = "";
        if (matchingArray[i].bankcount > matchingArray[i].altbankcount) {
            countcolor = "lightblue";
        }
        else if (matchingArray[i].bankcount < matchingArray[i].altbankcount) {
            countcolor = "salmon";
        }
        else {
            countcolor = "green";
        }

        countlayer.push(L.polygon([countcoords], {
            fillOpacity: 0.75,
            color: "black",
            fillColor: countcolor,
            weight: 1.5
        }).bindPopup("<h1>Neighborhood Name: " + matchingArray[i].hood + "</h1> <hr> <h3>Bank Count: " + matchingArray[i].bankcount + "</h1> <hr> <h3>Alternative Bank Count: " + matchingArray[i].altbankcount + "</h1> <hr> <h3>Median Income Rank: " + matchingArray[i].middlerank + "</h1> <hr> <h3>Median Income: $" + matchingArray[i].income));
    }

    var bankcountlayer = L.layerGroup(countlayer);

    var myMap = L.map("map", {
        center: [34.259395, -118.302467],
        zoom: 10,
        minZoom: 1,
        maxZoom: 20,
        layers: [streetmap]
    });

    d3.json('neighborhood_coordinates.json').then(data => {
        L.geoJson(data, {
            style: function (feature) {
                return {
                    color: "black",
                    fillOpacity: 0,
                    weight: 1.5
                };
            },
        }).addTo(myMap);
    });

    var incomelegend = L.control({ position: 'bottomright' });

    incomelegend.onAdd = function (myMap) {

        var div = L.DomUtil.create('div', 'infolegend'),
            grades = ["Less than $35k", "$35k to $55k", "$55k to $75k", "$75k to $95k", "$95k to $115k", "Greater than $115k"],
            labels = ["blue", "navy", "dodgerblue", "skyblue", "lightskyblue", "lightblue"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '">&nbsp;&nbsp;&nbsp;</i> ' +
                grades[i] + "<br>";
        }

        var draggable = new L.Draggable(div);
        draggable.enable()

        return div;
    };

    var bankcountlegend = L.control({ position: 'bottomright' });

    bankcountlegend.onAdd = function (myMap) {

        var div = L.DomUtil.create('div', 'infolegend'),
            grades = ["Higher Bank Count", "Higher Alt Bank Count", "Equal Bank Count & Alt Bank Count"],
            labels = ["lightblue", "salmon", "green"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '">&nbsp;&nbsp;&nbsp;</i> ' +
                grades[i] + "<br>";
        }

        var draggable = new L.Draggable(div);
        draggable.enable()

        return div;
    };

    var bankmarkerlegend = L.control({ position: 'bottomleft' });

    bankmarkerlegend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'infolegend'),
            grades = ["Bank Marker"],
            labels = ['https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                grades[i] + (" <img src=" + labels[i] + " height='30' width='20'>") + '<br>';
        }

        var draggable = new L.Draggable(div);
        draggable.enable()

        return div;
    };

    var altbankmarkerlegend = L.control({ position: 'bottomleft' });

    altbankmarkerlegend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'infolegend'),
            grades = ["Alt Bank Marker"],
            labels = ['https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                grades[i] + (" <img src=" + labels[i] + " height='30' width='20'>") + '<br>';
        }

        var draggable = new L.Draggable(div);
        draggable.enable()

        return div;
    };

    var baseMaps = {
        "Street Map": streetmap
    };

    var overlayMaps = {
        "Median Income x LA Neighborhood": incomelayer,
        "Bank vs Alt Bank Count x LA Neighborhood": bankcountlayer,
        "LA Bank Locations": bankClusters,
        "LA Alt Bank Locations": altbankClusters
    };

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    myMap.on('overlayadd', function (eventLayer) {
        if (eventLayer.name === 'Median Income x LA Neighborhood') {
            incomelegend.addTo(myMap);
            myMap.removeControl(bankcountlegend);
        }
        else if (eventLayer.name === 'Bank vs Alt Bank Count x LA Neighborhood') {
            bankcountlegend.addTo(myMap);
            myMap.removeControl(incomelegend);
        }
        else if (eventLayer.name === 'LA Bank Locations') {
            bankmarkerlegend.addTo(myMap);
        }
        else if (eventLayer.name === 'LA Alt Bank Locations') {
            altbankmarkerlegend.addTo(myMap);
        }
    });

    myMap.on('overlayremove', function (eventLayer) {
        if (eventLayer.name === 'Median Income x LA Neighborhood') {
            myMap.removeControl(incomelegend);
        }
        else if (eventLayer.name === 'Bank vs Alt Bank Count x LA Neighborhood') {
            myMap.removeControl(bankcountlegend);
        }
        else if (eventLayer.name === 'LA Bank Locations') {
            myMap.removeControl(bankmarkerlegend);
        }
        else if (eventLayer.name === 'LA Alt Bank Locations') {
            myMap.removeControl(altbankmarkerlegend);
        }
    });

}, 500);