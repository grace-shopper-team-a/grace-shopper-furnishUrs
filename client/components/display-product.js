import React from 'react'

function DisplayProduct(props) {
  const {product} = props
  return (
    <div
      style={{
        textAlign: 'center',
        border: '1px black solid',
        width: '50%',
        paddingBottom: '10px'
      }}
    >
      <h3>{product.name}</h3>
      <img src={product.imageUrl} rel="product-image" />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button>Add to Cart</button>
    </div>
  )
}

export default DisplayProduct
