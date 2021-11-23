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
    static associate({User, order_item}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.hasMany(order_item, {foreignKey: 'order_id'});
    }
  };
  order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: DataTypes.UUID,
    status: DataTypes.ENUM('paid', 'unpaid')
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};