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
      'https://secure.img1-fg.wfcdn.com/im/51347127/resize-h800-w800%5Ecompr-r85/1086/108610989/Skiles+Microfiber+21%2522+Armchair.jpg'
  },
  {
    name: 'LACK',
    description: 'Ut imperdiet bibendum neque volutpat dapibus',
    price: 100,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/84459083/resize-h800-w800%5Ecompr-r85/1069/106945610/Barlow+21%2522+Armchair.jpg'
  },
  {
    name: 'NORDEN',
    description:
      'Ut pulvinar, nulla sit amet placerat suscipit, leo risus rutrum odio',
    price: 80,
    quantity: 100,
    category: 'chair',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/56937908/resize-h800-w800%5Ecompr-r85/9747/97477933/Digby+Executive+Chair.jpg'
  },
  {
    name: 'JOKKMOKK',
    description: 'Etiam egestas elit lectus, at elementum neque elementum at',
    price: 300,
    quantity: 100,
    category: 'bed',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/46378067/resize-h800-w800%5Ecompr-r85/1011/101152204/Rhoton+Low+Profile+Platform+Bed.jpg'
  },
  {
    name: 'LERHAMN',
    description: 'Pellentesque quis facilisis lacus',
    price: 50,
    quantity: 100,
    category: 'bed',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/81835184/resize-h800%5Ecompr-r85/7799/77999136/Flemington+Platform+Bed.jpg'
  },
  {
    name: 'LISABO',
    description:
      ' Duis ultricies, lorem at pharetra tempus, ipsum dui gravida enim, sit amet suscipit sapien elit nec neque',
    price: 95,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/00220811/resize-h800-w800%5Ecompr-r85/1031/103149411/Valero+Coffee+Table+with+Storage.jpg'
  },
  {
    name: 'MALM',
    description: 'Suspendisse malesuada porta enim iaculis interdum',
    price: 120,
    quantity: 100,
    category: 'bed',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/38224989/resize-h800-w800%5Ecompr-r85/8683/86837264/Monarch+Hill+Ambrosia+Full+Platform+Bed.jpg'
  },
  {
    name: 'GLADOM',
    description:
      'In laoreet massa nec mauris egestas, id fringilla nisi pretium. Ut et vestibulum ante.',
    price: 75,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/53221328/resize-h800-w800%5Ecompr-r85/9216/92166458/Beliveau+Solid+Wood+Drum+Coffee+Table.jpg'
  },
  {
    name: 'KOPPANG',
    description:
      'Phasellus ornare lorem nec tortor varius, non pellentesque erat iaculis',
    price: 130,
    quantity: 100,
    category: 'table',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/67034653/resize-h800-w800%5Ecompr-r85/8403/84031718/Vazquez+Coffee+Table+with+Storage.jpg'
  },
  {
    name: 'HEMNES',
    description: 'Donec imperdiet tincidunt erat id consectetur',
    price: 150,
    quantity: 100,
    category: 'drawers',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/72144436/resize-h800-w800%5Ecompr-r85/1004/100456315/Cecille+Groove+6+Drawer+Double+Dresser.jpg'
  },
  {
    name: 'KULLEN',
    description: 'Maecenas vulputate ipsum felis, ut auctor purus mattis a',
    price: 180,
    quantity: 100,
    category: 'drawers',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/49197987/resize-h800-w800%5Ecompr-r85/6082/60824134/Gravity+6+Drawer+Double+Dresser.jpg'
  },
  {
    name: 'KOPPANG',
    description: 'Maecenas mattis consequat lacus nec tincidunt',
    price: 110,
    quantity: 100,
    category: 'drawers',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/35554383/resize-h800-w800%5Ecompr-r85/5468/54687138/Tracey+6+Drawer+Dresser.jpg'
  },
  {
    name: 'NORDMELA',
    description: 'Etiam blandit sapien quis magna maximus',
    price: 99,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/37989072/resize-h800-w800%5Ecompr-r85/9216/92163587/Bel-Air+72.25%2522+Square+Arm+Sofa.jpg'
  },
  {
    name: 'LENNART',
    description:
      'Vestibulum porta, sem id auctor auctor, erat lorem tempus nunc',
    price: 85,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/81481235/resize-h800-w800%5Ecompr-r85/1047/104788116/Joy+77%2522+Round+Arm+Sleeper.jpg'
  },
  {
    name: 'MICKE',
    description: 'Proin tincidunt mattis maximus',
    price: 125,
    quantity: 100,
    category: 'couch',
    imageUrl:
      'https://secure.img1-fg.wfcdn.com/im/79370581/resize-h800-w800%5Ecompr-r85/1143/114355111/Sylvette+78.5%2522+Reversible+Sectional+with+Ottoman.jpg'
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
  // .then(async cart=> {await cart.setProducts(2); console.log(await cart.getProducts())})//eslint-disable-line

  await CartedProduct.create({
    cartId: 1,
    productId: 4,
    quantity: 2
  })
  await CartedProduct.create({
    cartId: 1,
    productId: 1,
    quantity: 12
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
