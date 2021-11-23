'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Ads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log(models)
    }
  };
  Ads.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4()
    },
    link: DataTypes.STRING,
    image_link: DataTypes.STRING,
    counter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ads',
    freezeTableName: true
  });
  return Ads;
};