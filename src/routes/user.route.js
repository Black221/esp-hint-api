
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
    deleteUser
} = require("../controllers/user.controller");
const {requireAuth} = require("../middlewares/auth.middleware");


router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);

//User controller

//GET Users Information
// router.get('/', userController.getAllUsers);
router.get('/', (req, res) => {
    res.send('user');
})

router.get('/get/all', requireAuth, getAllUsers);
router.get('/get/:id', requireAuth, getUserInfo);

//Update
router.put('/update/:id', requireAuth, updateUser);

//Delete
router.delete('/del/:id', requireAuth, deleteUser);

//Visibility
module.exports = router;