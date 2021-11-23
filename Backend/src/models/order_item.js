'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order, product}) {
      // define association here
      this.belongsTo(order, {foreignKey: 'order_id'});
      this.belongsTo(product, {foreignKey: 'product_id'});
    }
  };
  order_item.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4()
    },
    order_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_item',
    freezeTableName: true
  });
  return order_item;
};