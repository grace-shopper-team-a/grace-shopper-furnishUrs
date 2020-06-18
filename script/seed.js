'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')
const CartedProduct = require('../server/db/models/cartedproducts')

const arrayOfProducts = [
  {
    name: 'Oak Chair',
    description: 'A premium chair made from oak wood. Strong and sturdy',
    price: 250,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'LACK',
    description: 'Ut imperdiet bibendum neque volutpat dapibus',
    price: 100,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'NORDEN',
    description:
      'Ut pulvinar, nulla sit amet placerat suscipit, leo risus rutrum odio',
    price: 80,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'JOKKMOKK',
    description: 'Etiam egestas elit lectus, at elementum neque elementum at',
    price: 300,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'LERHAMN',
    description: 'Pellentesque quis facilisis lacus',
    price: 50,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'LISABO',
    description:
      ' Duis ultricies, lorem at pharetra tempus, ipsum dui gravida enim, sit amet suscipit sapien elit nec neque',
    price: 95,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'MALM',
    description: 'Suspendisse malesuada porta enim iaculis interdum',
    price: 120,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'GLADOM',
    description:
      'In laoreet massa nec mauris egestas, id fringilla nisi pretium. Ut et vestibulum ante.',
    price: 75,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'KOPPANG',
    description:
      'Phasellus ornare lorem nec tortor varius, non pellentesque erat iaculis',
    price: 130,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'HEMNES',
    description: 'Donec imperdiet tincidunt erat id consectetur',
    price: 150,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'KULLEN',
    description: 'Maecenas vulputate ipsum felis, ut auctor purus mattis a',
    price: 180,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'KOPPANG',
    description: 'Maecenas mattis consequat lacus nec tincidunt',
    price: 110,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'NORDMELA',
    description: 'Etiam blandit sapien quis magna maximus',
    price: 99,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'LENNART',
    description:
      'Vestibulum porta, sem id auctor auctor, erat lorem tempus nunc',
    price: 85,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  },
  {
    name: 'MICKE',
    description: 'Proin tincidunt mattis maximus',
    price: 125,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://www.serenaandlily.com/dw/image/v2/AASD_PRD/on/demandware.static/-/Sites-masterCatalog_SerenaandLily/default/dwfea0d498/hi-res/Furn_Tucker_Chair_Natural_Oak_Angle_MV_0081_Crop_SH.jpg?sw=100&sh=125&sm=fit'
  }
]

async function seed() {
  await db.sync({force: true})

  await User.create({
    name: 'John Doe',
    email: 'johndoe@protonmail.com',
    password: '123456789',
    address: '123 Broadway, New York, NY 10001'
  })

  await Promise.all(
    arrayOfProducts.map(product => {
      return Product.create(product)
    })
  )

  await Cart.create({
    userId: 1,
    checkedOut: false
  })

  await CartedProduct.create({
    cartId: 1,
    productId: 4,
    quantity: 2
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
