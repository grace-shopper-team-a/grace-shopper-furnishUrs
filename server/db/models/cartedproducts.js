const db = require('../db')
const Sequelize = require('sequelize')

const CartedProduct = db.define('cartedproducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = CartedProduct
