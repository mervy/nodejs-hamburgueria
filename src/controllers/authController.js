exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin =  (req, res) => {
    const { email, password } = req.body;

    return res.redirect(`/auth/login?error=authenticationfailed&email=${email}`);

    //res.redirect('/user/dashboard');
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/auth/login');
    });
};