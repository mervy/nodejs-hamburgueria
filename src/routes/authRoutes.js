const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    try {
        authController.getLogin(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router;