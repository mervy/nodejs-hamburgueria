exports.getDashboard = (req, res) => {
    if (!req.session.userId) {
       // return res.redirect('/auth/login');
    }

    const { email } = req.query;

    res.render('dashboard', { user: { email } });
};