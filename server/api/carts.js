const router = require('express').Router()
const {Cart, CartedProduct} = require('../db/models')
const axios = require('axios')
module.exports = router

router.get('/:relatedUserId', async (req, res) => {
  try {
    const requestedCart = await Cart.findOne({
      where: {
        userId: req.params.relatedUserId,
        checkedOut: false
      }
    })
    res.json(requestedCart)
  } catch (err) {
    console.log(err)
  }
})

router.put('/', async (req, res, next) => {
  console.log('here')
  try {
    const id = req.body.userId
    const currentCart = await Cart.findOne({
      where: {
        userId: id,
        checkedOut: false
      }
    })
    if (currentCart.checkedOut === false) {
      currentCart.checkedOut = true
      await currentCart.save()
    }
    res.json(currentCart)
  } catch (error) {
    next(error)
  }
})
           
router.get('/:cartId', async (req, res) => {
  const cart = {products: [], totalPrice: 0}
  const productsInCart = await CartedProduct.findAll({
    where: {
      cartId: req.params.cartId
    }
  })

  cart.products = await Promise.all(
    productsInCart.map(async product => {
      let prod = await Product.findAll({
        where: {
          id: product.productId
        },
        attributes: [['id', 'productId'], 'name', 'price']
      })
      prod[0].quantity = product.quantity
      return prod[0] //+ quantity: product.quantity};
    })
  )

  cart.products.forEach(product => {
    cart.totalPrice += product.price * product.quantity
  })

  res.json(cart)
})

router.post('/', async (req, res, next) => {
  try {
    /*
     {products: [], totalPrice: 0}
     productId --> CartedProducts, quantity --> CartedProducts, totalPrice --> Carts
     */
    const {userId, localCart} = req.body
    const cart = await Cart.findOne({
      where: {
        userId,
        checkedOut: false
      }
    })

    if (!cart) {
      const cart = await Cart.create({
        userId
      })
      cart.totalPrice = localCart.totalPrice
      await cart.save()

      await Promise.all(
        localCart.products.map(async product => {
          await CartedProduct.create({
            cartId: cart.id,
            productId: product.productId,
            quantity: product.quantity
          })
        })
      )

      const {data} = axios.get(
        'http://localhost:8080/api/cartedproducts/' + cart.id
      )
      res.json(data)
    } else {
      const {data} = axios.get(
        'http://localhost:8080/api/cartedproducts/' + cart.id
      )
      res.json(data)
    }
  } catch (err) {
    next(err)
  }
})
