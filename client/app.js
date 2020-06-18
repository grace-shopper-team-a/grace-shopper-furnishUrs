import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ConnectedSingleProduct from './components/single-product'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
