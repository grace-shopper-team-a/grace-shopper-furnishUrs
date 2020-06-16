const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('Cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  checkedOut: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Cart
