var express = require('express');
CityRoute = require('./server/routes/CityRoute');
CustomerRoute = require('./server/routes/CustomerRoute');


module.exports = function(app){

//route path
  app.use('/api/City',CityRoute(express.Router()));
  app.use('/api/Customer',CustomerRoute(express.Router()));

}


