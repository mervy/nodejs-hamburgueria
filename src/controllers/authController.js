const User = require('../models/burgers');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.redirect('/auth/login');
        }

        req.session.userId = user._id;
        res.redirect('/user/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/auth/login');
    });
};