const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./auth');
const routes = require('./routes');
require('dotenv').config();
const path = require('path');
const renderWithUser = require("./middleware")  // Import the middleware

const sequelize = require('./database');

async function syncModels() {
    try {
        await sequelize.sync({force: false, alter: false});
        console.log('Models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

syncModels();

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Use the renderWithUser middleware
app.use(renderWithUser);

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
