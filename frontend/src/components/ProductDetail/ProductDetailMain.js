import React from 'react'
import './ProductDetailMain.scss'
import ProductDetail from './ProductDetail'
import Header from '../Header'
const ProductDetailMain = () => {
  return (
  <div >
    <div>
      <Header/>
    </div>
    <div className='product-detail-main'>
        <div>
        <ProductDetail/>
        </div>
    </div>
  </div>
  )
}

export default ProductDetailMain