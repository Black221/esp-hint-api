const express = require('express');
const router = express.Router();

const {
    deleteFile,
    updateFile,
    getOneFile,
    getAllFiles,
    addManyFiles,
    addOneFile,
} = require("../controllers/file.controller");


router.get('/', (req, res) => {
    res.send('file');
})


router.get('/get/all', getAllFiles);
router.get('/get/:id', getOneFile);

router.post('/add/many', addManyFiles);
router.post('/add/one', addOneFile);

router.put('/update/:id', updateFile);
router.delete('/del/:id', deleteFile);


module.exports = router;