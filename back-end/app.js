const express = require('express');
const cookieParser = require('cookie-parser'); // Importa o cookie-parser
const app = express();
require('dotenv').config();

const userRoutes = require('../back-end/routes/userRoutes');
const loginRoutes = require('../back-end/routes/loginRoutes'); 
const viewRoutes = require('../back-end/routes/viewRoutes')
const stopRoutes = require('../back-end/routes/stopRoutes')
const routeStopRoutes = require('../back-end/routes/routeStopRoutes')
const routeRoutes = require('../back-end/routes/routeRoutes')

app.use(express.static('front-end'));
app.use(cookieParser());  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', viewRoutes);
app.use('/', stopRoutes);
app.use('/', routeStopRoutes);
app.use('/', routeRoutes);

module.exports = app;
