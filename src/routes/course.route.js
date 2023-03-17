
const router = require('express').Router()

//Matiere
const {
    getAllCourse,
    getOneCourse,
    addCourse,
    addCourseFile,
    delCourseFile,
    updateCourse,
    delCourse,
    getUserCourses
} = require("../controllers/course.controller");

router.get('/get/user/:id_user', getUserCourses)
router.get('/get/all', getAllCourse);
router.get('/get/:id', getOneCourse);
router.post('/add', addCourse);
router.put('/update/file/:id_course/:id_file', addCourseFile);
router.put('/del/file/:id_course/:id_file', delCourseFile);
router.put('/update/icon/:id_course', updateCourse);
router.delete('/del/:id', delCourse);

module.exports = router