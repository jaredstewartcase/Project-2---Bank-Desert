var bank_data = []

d3.json('bank_coordinates.json').then(data => {
    //console.log(data);
    d3.json('neighborhood_coordinates.json').then(neighdata => {
        //console.log(neighdata);
        
        data.forEach(bank => {
            var bankname = bank["Bank Name"];
            var banksdata = ([+bank["Bank Long"], +bank["Bank Lat"]]);
            neighdata.features.forEach(neigh => {
                neigh.geometry.coordinates.forEach(polyNeigh => {
                    // console.log(polyNeigh);
                    var points = turf.points([banksdata]);
                    var searchWithin = turf.polygon(polyNeigh);
                    var ptsWithin = turf.pointsWithinPolygon(points, searchWithin)
                    if (ptsWithin.features.length > 0) {
                        console.log(`There is a Bank: ${bankname} in ${neigh.properties.external_id}`);
                        hood = neigh.properties.external_id;
                        banks = {
                            "bank_hood": hood,
                            "bank_name": bankname,
                            "bank_lat_lng": ([+bank["Bank Lat"], +bank["Bank Long"]])
                        };
                        bank_data.push(banks);
                    }
                });
            });
        });
        //console.log(bank_data);
    });
});

var altbank_data = []

d3.json('Alt_Bank.json').then(data => {
    //console.log(data);
    d3.json('neighborhood_coordinates.json').then(neighdata => {
        //console.log(neighdata);
        
        data.forEach(bank => {
            var bankname = bank["Alt Bank Name"];
            var banksdata = ([+bank["Alt Bank Long"], +bank["Alt Bank Lat"]]);
            neighdata.features.forEach(neigh => {
                neigh.geometry.coordinates.forEach(polyNeigh => {
                    // console.log(polyNeigh);
                    var points = turf.points([banksdata]);
                    var searchWithin = turf.polygon(polyNeigh);
                    var ptsWithin = turf.pointsWithinPolygon(points, searchWithin)
                    if (ptsWithin.features.length > 0) {
                        console.log(`There is an Alternative Bank: ${bankname} in ${neigh.properties.external_id}`);
                        hood = neigh.properties.external_id;
                        banks = {
                            "altbank_hood": hood,
                            "altbank_name": bankname,
                            "altbank_lat_lng": ([+bank["Alt Bank Lat"], +bank["Alt Bank Long"]])
                        };
                        altbank_data.push(banks);
                    }
                });
            });
        });
        //console.log(altbank_data);
    });
});