
const express = require('express');
const router = express.Router();

//Authentication
const {
    register,
    logout,
    login
} = require("../controllers/auth.controller");

const {
    getAllUsers,
    getUserInfo,
    updateUser,
    deleteUser, updateUserFormation, updateUserPassword
} = require("../controllers/user.controller");
const {requireAuth} = require("../middlewares/auth.middleware");
const {pictureUpload} = require("../middlewares/file.middleware");


router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);

//User controller

//GET Users Information

router.get('/get/all', requireAuth, getAllUsers);
router.get('/get/:id', requireAuth, getUserInfo);

//Update
router.put('/update/formation/:id/:department/:formation/:option', requireAuth, updateUserFormation);
router.put('/update/password/:id', requireAuth, updateUserPassword);
router.put('/update/picture/:id', pictureUpload, requireAuth, updateUser);

//Delete
router.delete('/del/:id', requireAuth, deleteUser);

//Visibility
module.exports = router;