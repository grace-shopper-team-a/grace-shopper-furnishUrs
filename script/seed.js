'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})

  await User.create({
    name: 'John Doe',
    email: 'johndoe@protonmail.com',
    password: '123456789',
    address: '123 Broadway, New York, NY 10001'
  })

  await Product.create({
    title: 'Oak Chair',
    description: 'A premium chair made from oak wood. Strong and sturdy',
    price: 250.0,
    quantity: 100,
    type: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  })

  await Cart.create({
    products: [
      {
        productId: 1,
        price: 250.0,
        quantity: 2
      }
    ],
    checkedOut: false
  })

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
