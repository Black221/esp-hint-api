const express = require('express');
const router = express.Router();

//Controllers
const {
    getAllDepartment,
    getOneDepartment,
    addDepartmentFormationOption,
    delDepartment,
    addDepartment,
    getAllMatiere,
    addMatiere,
    delMatiere,
    getAllOption,
    delOption,
    addOption,
    getOneOption,
    getAllFormation,
    getOneFormation,
    addFormation,
    delFormation,
    addMatiereFile,
    updateFormation,
    delDepartmentFormationOption,
    addDepartmentFormationOptionMatiere,
    updateMatiere, delMatiereFile, getOneMatiere,
} = require("../controllers/department.controller");


router.get('/', (req, res) => {
    res.send('constant');
})


//Department
router.get('/get/all', getAllDepartment);
router.get('/get/:id', getOneDepartment);
router.post('/add', addDepartment);
router.put('/update/matiere/:id_dep/:id_formation/:id_option/:id_matiere', addDepartmentFormationOptionMatiere);
router.put('/update/formation/:id_dep/:id_formation/:id_option', addDepartmentFormationOption);
router.delete('/del/:id_dep/:id_formation/:id_option', delDepartmentFormationOption);
router.delete('/del/:id', delDepartment);


//Formation
router.get('/formation/get/all', getAllFormation);
router.get('/formation/get/:id', getOneFormation);
router.post('/formation/add', addFormation);

router.put('/formation/update/:id_formation', updateFormation);
router.delete('/formation/del/:id', delFormation);


//Option
router.get('/option/get/all', getAllOption);
router.get('/option/get/:id', getOneOption);
router.post('/option/add/', addOption);
router.delete('/option/del/:id', delOption);


//Matiere
router.get('/matiere/get/all', getAllMatiere);
router.get('/matiere/get/:id', getOneMatiere);
router.post('/matiere/add', addMatiere);
router.put('/matiere/update/file/:id_matiere/:id_file', addMatiereFile);
router.put('/matiere/del/file/:id_matiere/:id_file', delMatiereFile);
router.put('/matiere/update/icon/:id_matiere', updateMatiere);
router.delete('/matiere/del/:id', delMatiere);


module.exports = router;