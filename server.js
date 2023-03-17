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
const CourseRoute = require('./src/routes/course.route');
const FileRoute = require('./src/routes/file.route');

const {requireAuth, verifyAuth} = require("./src/middlewares/auth.middleware");

server.use('/api/user', UserRoute);

server.use('/api/course', requireAuth, CourseRoute);


server.use('/api/file', verifyAuth, FileRoute);
server.use('/api/file/documents', express.static(path.join(__dirname, 'public/documents')));
server.use('/api/file/pictures', express.static(path.join(__dirname, 'public/pictures')));


server.get('*', (req, res) => {
    res.send('not found')
})


server.delete('/api/collection/del', async (req, res) => {
    try {
        await mongoose.connection.db.dropCollection(req.body.collection)
        return res.status(200).json({message: "Successfully deleted"});
    }  catch (err) {
        return res.status(500).json({error: err});
    }
});



server.listen(
    process.env.PORT,
    (err) => {
        if (!err)
            console.log(`Hello world app listening on port ${process.env.PORT}!`);
        else
            console.log("can't connect to server :",err);
    }
);