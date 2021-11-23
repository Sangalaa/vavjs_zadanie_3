'use strict';
const {
  Model
} = require('sequelize');

const {v4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ order_item }) {
      // define association here
      this.hasMany(order_item, {foreignKey: 'order_id'});
    }
  };
  product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4()
    },
    name: DataTypes.STRING,
    image_link: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'product',
    freezeTableName: true
  });

  return product;
};