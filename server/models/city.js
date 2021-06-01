const Sequelize = require('sequelize');
const sequelize = require("../config/env.js");
const Model = Sequelize.Model;

class city extends Model {}
city.init({
  id: {
    autoIncrement: true,
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
},
    {
  sequelize,
  tableName: 'city',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});


city.associate = (db) => {
  city.hasMany(db.customer,  {foreignKey: 'cityId', as: 'city'});
};
module.exports = () =>city;

