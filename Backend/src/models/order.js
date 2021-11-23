'use strict';
const {
  Model
} = require('sequelize');
const { v4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, order_item}) {
      // define association here
      this.belongsTo(user, {foreignKey: 'user_id'});
      this.hasMany(order_item, {foreignKey: 'order_id'});
    }
  };
  order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4()
    },
    user_id: DataTypes.UUID,
    status: DataTypes.ENUM('paid', 'unpaid'),
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    psc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
    freezeTableName: true
  });
  return order;
};