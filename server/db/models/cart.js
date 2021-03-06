const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
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

// Cart.beforeValidate(cart => {
//   cart.totalPrice = 0
//   cart.products.forEach(product => {
//     cart.totalPrice += product.price * product.quantity
//   })
// })

module.exports = Cart
