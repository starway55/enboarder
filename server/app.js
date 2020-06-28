const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.get('/allCapsules', async (req, res) => {

    try{
        const allCapsules = await axios.get('https://api.spacexdata.com/v3/capsules?sort=original_launch');
        res.status(200);
        res.send({
            result: allCapsules.data
        })
    }
    catch(error){

        res.status(500);
        res.send({
            error: error.message
        })
    }
})

app.post('/landingpad', async (req, res) => {

    if(!req.body.id){

        res.status(400);
        res.send({
            error: `An landing pad ID must be provided in the request body`
        })
    }

    const rows = await dbPool.query(`SELECT * FROM landingPad WHERE id = "${req.body.id}";`);
    
    if( rows.length === 0 ){ // Landing Pad not found in db
        
        try{
            const landingPadResponse = await axios.get(`https://api.spacexdata.com/v3/landpads/${req.body.id}`);
            const landingPad = landingPadResponse.data;

            const location = landingPad.location;
            const locationRows = await dbPool.query(`SELECT * FROM landingPadLocation WHERE locationName = "${location.name}";`);

            if(locationRows.length === 0){ // location not found in db, save location and landing pad

                await dbPool.query(`INSERT INTO landingPadLocation VALUES 
                ( "${location.name}", "${location.region}", ${location.latitude}, ${location.longitude}) ;`)
                await dbPool.query(`INSERT INTO landingPad VALUES
                ( "${landingPad.id}", "${location.name}", "${landingPad.full_name}", "${landingPad.status}" );`)

            }else { // location found in db, reuse location and save landing pad

                const locationRow = locationRows[0];
                await dbPool.query(`INSERT INTO landingPad VALUES
                ( "${landingPad.id}", "${locationRow.locationName}", "${landingPad.full_name}", "${landingPad.status}" );`)
            }

            res.status(200);
            res.send({
                result: {
                    id: landingPad.id,
                    full_name: landingPad.full_name,
                    status: landingPad.status,
                    location: landingPad.location
                }
            })
        }
        catch(error){
    
            res.status(500);
            res.send({
                error: error.message
            })
        }
    }
    else { // landing pad found in db, use landing pad in db

        const landingPad = rows[0];

        const locationRows = await dbPool.query(`SELECT * FROM landingPadLocation WHERE locationName = "${landingPad.locationName}"`);
 
        const location = locationRows[0];

        try{

            res.status(200);
            res.send({
                result: {
                    id: landingPad.id,
                    full_name: landingPad.fullName,
                    status: landingPad.landingPadStatus,
                    location: {
                        name: location.locationName,
                        region: location.region,
                        latitude: location.latitude,
                        longitude: location.longitude
                    }
                }
            })
        }
        catch(error){

            res.status(500);
            res.send({
                error: error.message
            })
        }
    }
})

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);