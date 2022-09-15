const express = require('express');
const server = express();


const bodyParser = require('body-parser');
const cors = require('cors');


server.use(cors());
// Configuring body parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


//Routes
const UserRoute = require('./src/routes/user.route');
const ConstantRoute = require('./src/routes/constants.route');
const FileRoute = require('./src/routes/file.route');

server.use('/api/user', UserRoute);
server.use('/api/file', FileRoute);
server.use('/api/constant', ConstantRoute);
server.get('*', (req, res) => {
    res.send('not found')
})

const PORT = 4200;

server.listen(
    PORT,
    (err) => {
        if (!err)
            console.log(`Hello world app listening on port ${PORT}!`);
        else
            console.log("can't connect to server :",err);
    }
);