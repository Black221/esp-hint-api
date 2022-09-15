const express = require('express');
const router = express.Router();

//Controllers
const {
    getAllDepartment,
    getOneDepartment,
    updateDepartment,
    delDepartment,
    addDepartment,
    getAllMatiere,
    getOneMatiere,
    addMatiere,
    updateMatiere,
    delMatiere
} = require("../controllers/constants.controller");


router.get('/', (req, res) => {
    res.send('constant');
})


//Department
router.get('/department/get/all', getAllDepartment);
router.get('/department/get/:id', getOneDepartment);
router.post('/department/add', addDepartment);
router.put('/department/update/:id', updateDepartment);
router.delete('/department/del/:id', delDepartment)

//Matiere
router.get('/matiere/get/all', getAllMatiere);
router.get('/matiere/get/:id', getOneMatiere);
router.post('/matiere/add', addMatiere);
router.put('/matiere/update/:id', updateMatiere);
router.delete('/matiere/del/:id', delMatiere)


module.exports = router;