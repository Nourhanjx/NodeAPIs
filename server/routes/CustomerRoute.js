var CustomerController = require('../controllers/CustomerController');
module.exports = function (CustomerRoute) {


    CustomerRoute.get('/All', CustomerController.GetAll);
    CustomerRoute.post('/CreateCustomer', CustomerController.CreateCustomer)
    CustomerRoute.get('/GetCustomerById/:id', CustomerController.GetCustomerById);
    CustomerRoute.post('/updateCustomer/:id', CustomerController.UpdateCustomer);
    CustomerRoute.post('/DeleteCustomer/:id', CustomerController.DeleteCustomer);
    CustomerRoute.get('/SearchForCustomer',CustomerController.SearchForCustomer);

    return CustomerRoute
};