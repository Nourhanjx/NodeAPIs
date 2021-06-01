var DataTypes = require("sequelize").DataTypes;
var _city = require("./city");
var _customer = require("./customer");

function sequalize(sequelize) {
  var city = _city(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);

  customer.belongsTo(city, { foreignKey: "cityId"});
  city.hasOne(customer, { foreignKey: "cityId"});

  return {
    city,
    customer,
  };
}
module.exports = sequalize;
module.exports.initModels = sequalize;
module.exports.default = sequalize;
