const express = require('express');
const cookieParser = require('cookie-parser'); 
const app = express();
require('dotenv').config();

const userRoutes = require('../back-end/routes/userRoutes');
const loginRoutes = require('../back-end/routes/loginRoutes'); 
const viewRoutes = require('../back-end/routes/viewRoutes')
const stopRoutes = require('../back-end/routes/stopRoutes')
const routeStopRoutes = require('../back-end/routes/routeStopRoutes')
const routeRoutes = require('../back-end/routes/routeRoutes')
const notificationRoutes = require('../back-end/routes/notificationRoutes')
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000'; 

app.use(express.static('front-end'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/config', (req, res) => {
  res.json({ serverUrl: SERVER_URL });
});

app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', viewRoutes);
app.use('/', stopRoutes);
app.use('/', routeStopRoutes);
app.use('/', routeRoutes);
app.use('/', notificationRoutes);

module.exports = app;
