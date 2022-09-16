const {mongoose} = require("mongoose");

const uri = "mongodb+srv://LHackSRT:"+process.env.DB_PASS+"@hintscluster.yefi5qz.mongodb.net/"+process.env.DB_NAME;

mongoose.connect(uri)
    .then( () => console.log('Connected to MDB'))
    .catch(error => () => console.log('Connected error'));