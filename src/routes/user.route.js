
const express = require('express');
const router = express.Router();

//Authentication
const {
    signUp,
    signIn,
    logout
} = require("../controllers/auth.controller");

const {
    getAllUsers,
    getUserInfo,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");


router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', logout);

//User controller

//GET Users Information
// router.get('/', userController.getAllUsers);
router.get('/', (req, res) => {
    res.send('user');
})

router.get('/get/all', getAllUsers);
router.get('/get/:id', getUserInfo);

//Update
router.put('/update/:id', updateUser);

//Delete
router.delete('/del/:id', deleteUser);

//Visibility
module.exports = router;