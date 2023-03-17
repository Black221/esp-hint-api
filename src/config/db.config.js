const mongoose = require("mongoose");

const uri = "mongodb+srv://LHackSRTHint:"+process.env.DB_PASS+"@hint-esp.uv6nmr6.mongodb.net/"+process.env.DB_NAME;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connected to MDB'))
    .catch(error  => console.log('Connected error', error));