import React from 'react' 
import ProductsAnalytics from '../../components/ProductsAnalytics/ProductsAnalytics'
import { Container } from '@mui/material' 
import OrdersAnalytics from '../../components/OrdersAnalytics/OrdersAnalytics'

const Analytics = () => {
  return (
    <Container>
        <ProductsAnalytics/> 
        <OrdersAnalytics/>
    </Container>
  )
}

export default Analytics
