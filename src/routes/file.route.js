const express = require('express');
const router = express.Router();

const {
    deleteFile,
    updateFile,
    getOneFile,
    getAllFiles,
    addOneFile,
} = require("../controllers/file.controller");
const {fileUpload} = require("../middlewares/file.middleware");


router.get('/', (req, res) => {
    res.send('file');
})


router.get('/get/all', getAllFiles);
router.get('/get/:id', getOneFile);

router.post('/add/:id_matiere',  fileUpload, addOneFile);

router.put('/update/:id',  updateFile);
router.delete('/del/:id',  deleteFile);


module.exports = router;