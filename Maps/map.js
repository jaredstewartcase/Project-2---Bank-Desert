var myMap = L.map("map", {
    center: [34.1, -117.8],
    zoom: 15
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

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