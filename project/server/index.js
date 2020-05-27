const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('./app/models');
const config = require('./config');

const app = express();
config.express(app);
config.routers(app);
app.use(cors());
const {appPort,mongoUri} = config.app;

mongoose.connect(mongoUri).then(()=> {
    app.listen(appPort,()=>{
        console.log(`listening on port ${appPort}...`);
    }).catch(err=> {
        console.error(`Error connecting to mongo: ${mongoUri}`,err);
    })
})

