const express = require('express');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const mongoose = require('./config'); // Certifique-se de que este arquivo exporta a conexão com o mongoose corretamente
const { User, Burger } = require('./models/burgers'); // Certifique-se de que o modelo está corretamente definido

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

// Usando express.urlencoded para analisar corpos de solicitação URL-encoded
app.use(express.urlencoded({ extended: false }));

// Configuração da Sessão
app.use(session({
    secret: '98c9be3c18e64cd50813d290ef04f26179ed1039bb5f962768a275c5bb380e08',
    resave: true,
    saveUninitialized: true
}));

app.get('/', async (req, res) => {
    try {
        const burgerCarousel = await Burger.find().limit(3).lean();
        const burger = await Burger.find().skip(3).lean();
        //console.log(burger)
        res.render('home', { burgerCarousel, burger, title:"Página inicial" });
    } catch (err) {
        console.error(err);        
        res.status(500).send(`Erro ao listar os hambúrgueres ${process.env.MONGO_URI}`);
    }
});

// Rotas estáticas
app.get('/menu', (req, res) => res.render('menu'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/about', (req, res) => res.render('about'));
app.get('/login', (req, res) => res.render('login'));
app.get('/form-create-user', (req, res) => res.render('createUser', { title: 'Create a new User', session: req.session }));
app.get('/form-create-burger', (req, res) => res.render('createBurger', { title: 'Inserir um novo burguer', session: req.session }));

// Corrigido a rota de autenticação
app.post('/auth', (req, res) => {
    // Lógica de autenticação deveria estar aqui
});

app.post('/insert-user', async (req, res) => {
    const userData = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    };

    try {
        const newUser = await User.create(userData);
        req.session.successMessage = 'User created successfully!';
        res.redirect('/form-create-user');
    } catch (error) {
        req.session.errorMessage = `Error creating user:${error.message}`;
        res.redirect('/form-create-user');
    }
});

app.post('/insert-burger', async (req, res) => {
    const burgerData = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        promotion: req.body.promotion,
        stock: req.body.stock,
    };

    try {
        const newBurger = await Burger.create(burgerData);
        req.session.successMessage = 'New burger inserted successfully!';
        res.redirect('/form-create-burger');
    } catch (error) {
        req.session.errorMessage = `Error inserting burger:${error.message}`;
        res.redirect('/form-create-burger');
    }
});

app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});
