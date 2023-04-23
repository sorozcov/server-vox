-- CREATE SCHEMA VOX ONLY FIRST TIME
CREATE SCHEMA IF NOT EXISTS `vox` ;

-- RUN ONLY TO TEST THE DB LOCALLY WITH API
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

-- USE DATABASE VOX
USE vox;

-- CREATE TABLE ACCOMMODATIONS
CREATE TABLE IF NOT EXISTS Accommodations (
    AccommodationLatitude float,
    AccommodationLongitude float,
    AccommodationId int primary key not null,
    AccommodationTitle varchar(512),
    AccommodationAdvertiser varchar(512),
    AccommodationDescription varchar(10000),
    AccommodationIsReformed bool,
    AccommodationPhone varchar(20),
    AccommodationType varchar(20),
    AccommodationPrice float,
    AccommodationPricePerMeter float,
    AccommodationAddress varchar(512),
    AccommodationProvince varchar(512),
    AccommodationCity varchar(255),
    AccommodationSquaredMeters int,
    AccommodationNumberOfRooms int,
    AccommodationNumberofBathrooms int,
    AccommodationHasParking bool,
    AccommodationIsSecondHand bool,
    AccommodationHasFittedWardrobes bool,
    AccommodationYearBuilt int,
    AccommodationIsFurnished bool,
    AccommodationHeatingType varchar(25),
    AccommodationHasEnergeticCertification bool,
    AccommodationFloor int,
    AccommodationIsExterior bool,
    AccommodationIsInterior bool,
    AccommodationHasElevator bool,
    AccommodationDate date,
    AccommodationStreet varchar(512),
    AccommodationNeighborhood varchar(512),
    AccommodationDistrict varchar(512),
    AccommodationHasRooftop bool,
	AccommodationHasStorageRoom bool,
    AccommodationIsKitchenEquipped bool,
    AccommodationIsFirstKitchenEquipped bool,
    AccommodationHasAirConditioner bool,
    AccommodationHasPool bool,
	AccommodationHasGarden bool,
	AccommodationUsefulSquaredMeters int,
	AccommodationIsSuitableForPeopleWithReducedMobility bool,
	AccommodationNumberOfFloors int,
    AccommodationIsPetFriendly bool,
    AccommodationHasBalcony bool
);

-- SELECT FROM ACCOMODATIONS
SELECT * FROM Accommodation