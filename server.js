require('dotenv').config({path: "./src/config/.env"});
require('./src/config/db.config');

const express = require('express');
const server = express();
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');


server.use(cors());
// Configuring body parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());



//Routes
const UserRoute = require('./src/routes/user.route');
const DepartmentRoute = require('./src/routes/department.route');
const FileRoute = require('./src/routes/file.route');
const {requireAuth, verifyAuth} = require("./src/middlewares/auth.middleware");
const {delCollection} = require("./src/controllers/department.controller");

server.use('/api/user', UserRoute);
server.use('/api/file', verifyAuth, FileRoute);
server.use('/api/department', requireAuth, DepartmentRoute);
server.use('/api/file/documents', verifyAuth, express.static(path.join(__dirname, 'public/documents')));
server.get('*', (req, res) => {
    res.send('not found')
})
server.delete('/api/collection/del', delCollection);




server.listen(
    process.env.PORT,
    (err) => {
        if (!err)
            console.log(`Hello world app listening on port ${PORT}!`);
        else
            console.log("can't connect to server :",err);
    }
);