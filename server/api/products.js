const router = require('express').Router()
const Product = require('../db/models/products')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (products) res.status(200).json(products)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const product = await Product.findByPk(id)
    if (product) res.status(200).json(product)
    else res.status(404).send('<h1>PAGE NOT FOUND</h1>')
  } catch (error) {
    next(error)
  }
})

module.exports = router
