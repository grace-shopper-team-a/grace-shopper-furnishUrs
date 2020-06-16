const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  description: {
      type: Sequelize.TEXT
  },
  price: {
      type: Sequelize.DECIMAL,
      validate: {
          isDecimal: true
      }
  },
  imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'https://cdn.vox-cdn.com/thumbor/hYG_03H7uW13XhJ5khtpB7N9fXI=/0x0:3600x2400/1200x800/filters:focal(1600x898:2176x1474)/cdn.vox-cdn.com/uploads/chorus_image/image/66549371/003_photo__8024407.0.jpg'
  },
  category: {
      type: Sequelize.ENUM('chair', 'table', 'couch', 'bed', 'drawers')
  },
  quantity: {
      type: Sequelize.INTEGER
  }
})

module.exports = Product
