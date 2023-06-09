const db = require("../database");
const fs = require("fs"); 
const csv = require("csvtojson");
const {parseBool,parseDate,parseNumber} = require("../utils");


async function getAccommodations() {
    let result = await db.query('select * from Accommodations');
    return result;
}

async function getAccommodationsFiltered(minPrice,maxPrice,numberOfRooms) {
    let priceMinFilter =  minPrice ? `AccommodationPrice >= ${minPrice}` : null;
    let priceMaxFilter = maxPrice ? `AccommodationPrice <= ${maxPrice}` : null;
    let numberOfRoomsFilter = numberOfRooms ? `AccommodationNumberOfRooms >= ${numberOfRooms}` : null;
    let filters = [priceMinFilter,priceMaxFilter,numberOfRoomsFilter].filter(f=>f!=null);
    let query = `select * from Accommodations ${filters.length>0 ? 'where ' + filters.join(" and ") : ''} ;`;
    let result = await db.query(query);
    return result;
}

async function getAveragePriceAccommodations(latitude,longitude,distanceKm) {
    let query = `select AVG(AccommodationPricePerMeter) as averagePricePerSquaredMeter from Accommodations where (ST_Distance(
        ST_SRID(Point(${longitude}, ${latitude}),4326), 
        ST_SRID(Point(AccommodationLongitude,AccommodationLatitude),4326)
      ))/1000 <=${distanceKm}`;
    let result = await db.query(query);
    return result;
}

async function getAccommodationsInBounds(latitude,longitude,distanceKm) {
    let query = `select * from Accommodations where (ST_Distance(
        ST_SRID(Point(${longitude}, ${latitude}),4326), 
        ST_SRID(Point(AccommodationLongitude,AccommodationLatitude),4326)
        ))/1000 <=${distanceKm}`;
    let result = await db.query(query);
    return result;
}


async function getAccommodationsReport(minPrice,maxPrice,numberOfRooms,latitude,longitude,distanceKm) {
    let priceMinFilter =  minPrice ? `AccommodationPrice >= ${minPrice}` : null;
    let priceMaxFilter = maxPrice ? `AccommodationPrice <= ${maxPrice}` : null;
    let numberOfRoomsFilter = numberOfRooms ? `AccommodationNumberOfRooms >= ${numberOfRooms}` : null;
    let filters = [priceMinFilter,priceMaxFilter,numberOfRoomsFilter].filter(f=>f!=null);
    let latLonFilter = `(ST_Distance(
        ST_SRID(Point(${longitude}, ${latitude}),4326), 
        ST_SRID(Point(AccommodationLongitude,AccommodationLatitude),4326)
        ))/1000 <=${distanceKm} ${filters.length>0 ? 'and ' : ''}`
    let query = `select * from Accommodations where ${latLonFilter} ${filters.length>0 ? filters.join(" and ") : ''} ;`;
    let result = await db.query(query);
    return result;
}

async function uploadAccommodationsFromFile(files){
    let file = Array.isArray(files.files) ? files.files[0] : files.files;
    let accomodationsList = await csv().fromString(file.data.toString());
    let query = `INSERT INTO Accommodations
    (AccommodationId,
    AccommodationLatitude,
    AccommodationLongitude,
    AccommodationTitle,
    AccommodationAdvertiser,
    AccommodationDescription,
    AccommodationIsReformed,
    AccommodationPhone,
    AccommodationType,
    AccommodationPrice,
    AccommodationPricePerMeter,
    AccommodationAddress,
    AccommodationProvince,
    AccommodationCity,
    AccommodationSquaredMeters,
    AccommodationNumberOfRooms,
    AccommodationNumberofBathrooms,
    AccommodationHasParking,
    AccommodationIsSecondHand,
    AccommodationHasFittedWardrobes,
    AccommodationYearBuilt,
    AccommodationIsFurnished,
    AccommodationHeatingType,
    AccommodationHasEnergeticCertification,
    AccommodationFloor,
    AccommodationIsExterior,
    AccommodationIsInterior,
    AccommodationHasElevator,
    AccommodationDate,
    AccommodationStreet,
    AccommodationNeighborhood,
    AccommodationDistrict,
    AccommodationHasRooftop,
    AccommodationHasStorageRoom,
    AccommodationIsKitchenEquipped,
    AccommodationIsFirstKitchenEquipped,
    AccommodationHasAirConditioner,
    AccommodationHasPool,
    AccommodationHasGarden,
    AccommodationUsefulSquaredMeters,
    AccommodationIsSuitableForPeopleWithReducedMobility,
    AccommodationNumberOfFloors,
    AccommodationIsPetFriendly,
    AccommodationHasBalcony
    )
    VALUES
    ?;`.replace(/(\r\n|\n|\r)/gm, "");
    let values = accomodationsList.map(accom=>[
        accom.ID,
        parseNumber(accom.Latitud),
        parseNumber(accom.Longitud),
        accom.Titulo,
        accom.Anunciante,
        accom.Descripcion,
        parseBool(accom.Reformado),
        accom.Telefonos,
        accom.Tipo,
        parseNumber(accom.Precio),
        parseNumber(accom['Precio por metro']),
        accom.Direccion,
        accom.Provincia,
        accom.Ciudad,
        parseNumber(accom['Metros cuadrados']),
        parseNumber(accom.Habitaciones),
        parseNumber(accom['Baños']),
        parseBool(accom.Parking),
        parseBool(accom['Segunda mano']),
        parseBool(accom['Armarios Empotrados']),
        parseNumber(accom['Construido en']),
        parseBool(accom.Amueblado),
        accom['Calefacción indiviudal'],
        parseBool(accom['Certificación energética']),
        parseNumber(accom.Planta),
        parseBool(accom.Exterior),
        parseBool(accom.Interior),
        parseBool(accom.Ascensor),
        parseDate(accom.Fecha),
        accom.Calle,
        accom.Barrio,
        accom.Distrito,
        parseBool(accom.Terraza),
        parseBool(accom.Trastero),
        parseBool(accom['Cocina Equipada']),
        parseBool(accom['Cocina equipada']),
        parseBool(accom['Aire acondicionado']),
        parseBool(accom.Piscina),
        parseBool(accom['Jardín']),
        parseNumber(accom['Metros cuadrados útiles']),
        parseBool(accom['Apto para personas con movilidad reducida']),
        parseNumber(accom.Plantas),
        parseBool(accom['Se admiten mascotas']),
        parseBool(accom['Balcón'])])
    let result = await db.query(query,[values]);
    return result;
}    
    


module.exports = {
    getAccommodations,
    uploadAccommodationsFromFile,
    getAccommodationsFiltered,
    getAccommodationsInBounds,
    getAveragePriceAccommodations,
    getAccommodationsReport
}
