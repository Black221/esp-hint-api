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
    delMatiere,
    getAllOption,
    delOption,
    updateOption,
    addOption,
    getOneOption,
    delCollection,
    getAllFormation,
    getOneFormation,
    addFormation,
    delFormation,
    updateFormationAddDepartment,
    UpdateFormationAddOption, updateFormationAddOption,
} = require("../controllers/constants.controller");


router.get('/', (req, res) => {
    res.send('constant');
})


//Department
router.get('/department/get/all', getAllDepartment);
router.get('/department/get/:id', getOneDepartment);
router.post('/department/add', addDepartment);
router.put('/department/update/:id_dep/:id_formation/:id_option', updateDepartment);
router.delete('/department/del/:id', delDepartment);


//Department
router.get('/formation/get/all', getAllFormation);
router.get('/formation/get/:id', getOneFormation);
router.post('/formation/add', addFormation);
router.put('/formation/update/dep/:id_formation/:id_dep', updateFormationAddDepartment);
router.put('/formation/update/option/:id_formation/:id_option', updateFormationAddOption);
router.delete('/formation/del/:id', delFormation);


//Matiere
router.get('/option/get/all', getAllOption);
router.get('/option/get/:id', getOneOption);
router.post('/option/add/:id', addOption);
router.put('/option/update/:id_option/:id_matiere', updateOption);
router.delete('/option/del/:id', delOption);


//Matiere
router.get('/matiere/get/all', getAllMatiere);
router.get('/matiere/get/:id', getOneMatiere);
router.post('/matiere/add', addMatiere);
router.put('/matiere/update/:id_matiere/:id_file', updateMatiere);
router.delete('/matiere/del/:id', delMatiere);

router.delete('/collection/del', delCollection);


module.exports = router;