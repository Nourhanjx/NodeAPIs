const ApiResonse = require('../helpers/ApiResponse');
Customer = require('../models').customer;
City = require('../models').city;

module.exports = {

    //get all customers
    async GetAll(req, res) {

        let customers;
        try {
            customers = await Customer.findAll({
                attributes: ['id', 'name'],
                include:
                    {
                        model: City,
                        as: 'city',
                        attributes: ['id', 'name']
                    }
            });
            ApiResonse.setSuccess('congratulations, customers fetched successfully');
            ApiResonse.setData(customers);
            res.json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,customers error : ' + error.message);
            res.json(ApiResonse).end();
        }
    },

    async CreateCustomer(req,res){
        try{
            customers = await Customer.create({
                name : req.body.name,
                cityId : req.body.cityId
            });
            ApiResonse.setSuccess('congratulations, you have created a customer successfully');
            ApiResonse.setData(customers);
            res.json(ApiResonse).end();
        }catch (error){
            ApiResonse.setError('Oops,customers error : ' + error.message);
            res.json(ApiResonse).end();
        }
    },

    async GetCustomerById(req, res) {
        try {

            Customer = await Customer.findByPk(req.params.id, {
                attributes: ['id', 'name'],
                include:
                    {
                        model: City,
                        as: 'city',
                        attributes: ['id', 'name']
                    }
            });

            ApiResonse.setSuccess('congratulations, Customer fetched successfully');
            ApiResonse.setData(Customer);
            res.json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,Customer error : ' + error.message);
            res.json(ApiResonse).end();
        }

    },

    async UpdateCustomer(req, res) {
        try {
            Customer = await Customer.findByPk(req.params.id)
            if (!Customer) {
                ApiResonse.setError('Oops, we can\'t found this Customer');
                res.status(404).json(ApiResonse).end();
            }
            await Customer.update(req.body, { where: { id: Customer.id } })
            ApiResonse.setSuccess('congratulations,Customer updated successfully');
            res.status(200).json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,' + error.message);
            res.status(500).json(ApiResonse).end();
        }

    },

    async DeleteCustomer(req, res) {
        try {
            Customer = Customer.findByPk(req.params.id);
            if (!Customer) {
                ApiResonse.setError('Oops, we can\'t find the Customer');
                res.status(404).json(ApiResonse).end();
            }
            await Customer.destroy(req.body, { where: { id: Customer.id } });

        } catch (error) {
            ApiResonse.setError('Oops,' + error.message);
            res.status(500).json(ApiResonse).end();
        }
    },

    async SearchForCustomer(req,res){
        try {

            Customer = await Customer.findAndCountAll({
                where: {name: req.query.name},
                include:
                    {
                        model: City,
                        as: 'city',
                        attributes: ['id', 'name']
                    }
            });
            ApiResonse.setSuccess('congratulations, Customer fetched successfully');
            ApiResonse.setData(Customer);
            res.status(200).json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,Customer error : ' + error.message);
            res.status(500).json(ApiResonse).end();
        }
    }



}