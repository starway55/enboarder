CREATE TABLE spaceData (
  id varchar(255) NOT NULL,
  spaceItem varchar(8000) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE landingPadLocation (
  locationName varchar(255),
  region varchar(255),
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  PRIMARY KEY (locationName)
);

CREATE TABLE landingPad (
  id varchar(255) NOT NULL,
  locationName varchar(255),
  fullName varchar(255),
  landingPadStatus varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (locationName) REFERENCES landingPadLocation(locationName)
);