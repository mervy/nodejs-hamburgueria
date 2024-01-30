const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Burger } = require('./models/user');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database MONGO DB ATLAS connected'))
    .catch(err => console.error(`DB connection error: ${err.message}`));

const userData = {
    username: 'rafa',
    // Hash da senha antes de armazenar no banco de dados
    password: bcrypt.hashSync('Rafa2107', 10),
    email: 'rafael@gkult.net',
};

const burgerData = {
    title: 'Classic Burger',
    image: 'classic-burger.jpg',
    description: 'A delicious classic burger with all the toppings',
    price: 19.99,
    stock: 100,
};

const insertData = async () => {
    try {
        const newUser = await User.create(userData);
        console.log('New user created:', newUser);

        const newBurger = await Burger.create(burgerData);
        console.log('New burger created:', newBurger);
    } catch (error) {
        console.error('Error inserting data:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

insertData();
