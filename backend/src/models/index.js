const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const models = {
  Author: require('./Author')(sequelize, Sequelize.DataTypes),
  Book: require('./Book')(sequelize, Sequelize.DataTypes),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
module.exports = models; 