const Sequelize = require("../../node_modules/sequelize");

const sequelize = new Sequelize("solutionCastle", "root", "Nourhan@123", {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;


