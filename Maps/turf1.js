var bank_data = []

d3.json("bank_coordinates.json", function (error, data) {
    if (error) throw error;
    data.forEach(function (bank) {
        var bankname = bank["Bank Name"];
        var banksdata = ([+bank['Bank Long'], +bank['Bank Lat']]);

        d3.json("neighborhood_coordinates.json", function (error, data) {
            if (error) throw error;
            for (var i = 0; i < data.features.length; i++) {
                var hood = data.features[i].properties.external_id;
                var searchWithin = turf.multiPolygon([
                    ([data.features[i].geometry.coordinates[0][0]])
                ]);
                var points = turf.points([banksdata]);
                var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);

                for (var j = 0; j < ptsWithin.features.length; j++) {
                    if (ptsWithin.features.length > 0) {
                        var banks = {};
                        var bank_lat_lng = [(ptsWithin.features[j].geometry.coordinates[1]), (ptsWithin.features[j].geometry.coordinates[0])];
                        banks["bank_hood"] = hood;
                        banks["bank_name"] = bankname;
                        banks["bank_lat_lng"] = bank_lat_lng;
                        bank_data.push(banks);
                    }
                }
            }
        });
    })
});

var altbank_data = []

d3.json("Alt_Bank.json", function (error, altdata) {
    if (error) throw error;
    altdata.forEach(function (altbank) {
        var altbankname = altbank["Alt Bank Name"];
        var altbanksdata = ([+altbank['Alt Bank Long'], +altbank['Alt Bank Lat']]);

        d3.json("neighborhood_coordinates.json", function (error, altdata) {
            if (error) throw error;
            for (var i = 0; i < altdata.features.length; i++) {
                var althood = altdata.features[i].properties.external_id;
                var altsearchWithin = turf.multiPolygon([
                    ([altdata.features[i].geometry.coordinates[0][0]])
                ]);
                var altpoints = turf.points([altbanksdata]);
                var altptsWithin = turf.pointsWithinPolygon(altpoints, altsearchWithin);

                for (var j = 0; j < altptsWithin.features.length; j++) {
                    if (altptsWithin.features.length > 0) {
                        var altbanks = {};
                        var altbank_lat_lng = [(altptsWithin.features[j].geometry.coordinates[1]), (altptsWithin.features[j].geometry.coordinates[0])];
                        altbanks["bank_hood"] = althood;
                        altbanks["bank_name"] = altbankname;
                        altbanks["bank_lat_lng"] = altbank_lat_lng;
                        altbank_data.push(altbanks);
                    }
                }
            }
        });
    })
});



