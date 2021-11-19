'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, OrderItem }) {
      // define association here
      this.belongsTo(User)
      this.belongsToMany(OrderItem)
    }
  };
  order.init({
    id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};