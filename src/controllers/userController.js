exports.getDashboard = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    res.render('dashboard', { user: { username: 'Exemplo' } });
};