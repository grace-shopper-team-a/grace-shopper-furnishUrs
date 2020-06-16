const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('Cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  products: {
    type: Sequelize.JSON,
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

Cart.beforeValidate(cart => {
  cart.totalPrice = 0
  cart.products.forEach(product => {
    cart.totalPrice += product.price * product.quantity
  })
})

module.exports = Cart
