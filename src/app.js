const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const port = process.env.PORT || 3000

const mongoose = require('./config');
const { User, Burger } = require('./models/burgers');

const app = express()

app.use(express.static('public'))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

// Configuração do Express
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração da Sessão
app.use(session({
    secret: '98c9be3c18e64cd50813d290ef04f26179ed1039bb5f962768a275c5bb380e08',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/menu', (req, res) => {
    res.render('menu')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/form-create-user', (req, res) => {
    res.render('createUser', { title: 'Create a new User', session: req.session })
})

app.get('/form-create-burger', (req, res) => {
    res.render('createBurger', { title: 'Inserir um novo burguer', session: req.session })
})

app.post('auth', (req, res) => {
    session: req.session;
})

app.post('/create', async (req, res) => {
    const userData = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    };

    try {
        const newUser = await User.create(userData);
        console.log('New user created:', newUser);

        //res.redirect('/form-create-user?success=User created successfully!');
        req.session.successMessage = 'User created successfully!';

        // Redirecione para a página de criação de usuário
        res.redirect('/form-create-user');
    } catch (error) {

        req.session.errorMessage = `Error creating user:${error.message}`

        // Redirecione para a página de criação de usuário
        res.redirect('/form-create-user');

        //console.error('Error creating user:', error.message);
        //res.status(500).send('Error creating user');
    }
});

app.listen(port, () => {
    console.log(`Server running in port: ${port}`)
})