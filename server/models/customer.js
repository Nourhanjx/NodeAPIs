
const Sequelize = require('sequelize');
const sequelize = require("../config/env.js");
const Model = Sequelize.Model;
const city = require("./city");
  class customer extends Model {}
  customer.init({

    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    cityId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      },

    }
  }, {
    sequelize,
    tableName: 'customer',
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
      {
        name: "cityId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cityId" },
        ]
      },
    ]
  });

module.exports = () =>customer;


