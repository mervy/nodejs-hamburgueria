const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({ 
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

app.get('/', (req, res) => {
    res.render('home', { title: 'Página Inicialmain' })
})
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login page' })
})

app.listen(port, () => {
    console.log(`Server running in port: ${port}`)
})