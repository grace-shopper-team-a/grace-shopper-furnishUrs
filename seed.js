const Sequelize = require('sequelize')
const {db} = require('./server/db')
const {User, Product, Cart} = require('./server/db/models')

db.sync({force: true})

User.create({
  name: 'John Doe',
  email: 'johndoe@protonmail.com',
  password: '123456789',
  address: '123 Broadway, New York, NY 10001'
})

Product.create({
  title: 'Oak Chair',
  description: 'A premium chair made from oak wood. Strong and sturdy',
  price: 250.0,
  quantity: 100,
  type: 'chair',
  imageUrl:
    'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
})

Cart.create({
  products: [
    {
      productId: 1,
      price: 250.0,
      quantity: 2
    }
  ],
  checkedOut: false
})
