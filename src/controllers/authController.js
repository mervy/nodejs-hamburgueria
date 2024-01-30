exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin =  (req, res) => {
    res.redirect('/user/dashboard');
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/auth/login');
    });
};