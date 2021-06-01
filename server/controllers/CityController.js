const ApiResonse = require('../helpers/ApiResponse');
City = require('../models').city;
module.exports = {

    //get all cities
    async GetAll(req, res) {

        let cities;
        try {
            cities = await City.findAll({
                attributes: ['id', 'name']
            });
            ApiResonse.setSuccess('congratulations, cities fetched successfully');
            ApiResonse.setData(cities);
           res.json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,cities error : ' + error.message);
            res.json(ApiResonse).end();
        }
        },

    async CreateCity(req,res){
        try{
            cities = await City.create({
                name : req.body.name
            });
            ApiResonse.setSuccess('congratulations, you have created a city successfully');
            ApiResonse.setData(cities);
            res.json(ApiResonse).end();
        }catch (error){
            ApiResonse.setError('Oops,cities error : ' + error.message);
            res.json(ApiResonse).end();
        }
    },

    async GetCityById(req, res) {
        try {

            city = await City.findByPk(req.params.id, {
                attributes: ['id', 'name'],
            });

            ApiResonse.setSuccess('congratulations, city fetched successfully');
            ApiResonse.setData(city);
            res.json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,city error : ' + error.message);
            res.json(ApiResonse).end();
        }

    },

    async UpdateCity(req, res) {
        try {
            city = await City.findByPk(req.params.id)
            if (!city) {
                ApiResonse.setError('Oops, we can\'t found this city');
                res.status(404).json(ApiResonse).end();
            }
            await city.update(req.body, { where: { id: city.id } })
            ApiResonse.setSuccess('congratulations,city updated successfully');
            res.status(200).json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,' + error.message);
            res.status(500).json(ApiResonse).end();
        }

    },

    async DeleteCity(req, res) {
        try {
            city = City.findByPk(req.params.id);
            if (!city) {
                ApiResonse.setError('Oops, we can\'t find the city');
                res.status(404).json(ApiResonse).end();
            }
            await City.destroy(req.body, { where: { id: city.id } });

        } catch (error) {
            ApiResonse.setError('Oops,' + error.message);
            res.status(500).json(ApiResonse).end();
        }
    },

    async SearchForCity(req,res){
        try {

            city = await City.findAndCountAll({
                where: {name: req.query.name},
                attributes: ['id', 'name'],
            });
            ApiResonse.setSuccess('congratulations, city fetched successfully');
            ApiResonse.setData(city);
            res.status(200).json(ApiResonse).end();
        } catch (error) {
            ApiResonse.setError('Oops,city error : ' + error.message);
            res.status(500).json(ApiResonse).end();
        }
    }



}