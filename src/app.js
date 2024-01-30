const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')

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

// Configuração de Rotas
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res)=>{
    res.render('home')
})

app.listen(port, () => {
    console.log(`Server running in port: ${port}`)
})