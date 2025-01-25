const express = require('express');
const cookieParser = require('cookie-parser'); // Importa o cookie-parser
const app = express();
require('dotenv').config();

const motoristaRoutes = require('../back-end/routes/userRoutes');
const loginRoutes = require('../back-end/routes/loginRoutes'); 
const viewRoutes = require('../back-end/routes/viewRoutes')

app.use(express.static('front-end'));
app.use(cookieParser());  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/', motoristaRoutes);
app.use('/', loginRoutes);
app.use('/', viewRoutes);

module.exports = app;
