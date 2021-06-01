var CityController = require('../controllers/CityController');
module.exports = function (CityRoute) {


    CityRoute.get('/All', CityController.GetAll);
    CityRoute.post('/CreatCity',CityController.CreateCity);
    CityRoute.get('/GetCityById/:id', CityController.GetCityById);
    CityRoute.post('/updateCity/:id', CityController.UpdateCity);
    CityRoute.post('/DeleteCity/:id', CityController.DeleteCity);
    CityRoute.get('/SearchForCity',CityController.SearchForCity);

    return CityRoute
};