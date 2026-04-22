import React from 'react'
import ProductList from '../../components/ProductList/ProductList'
import { Box } from '@mui/material'
const Kids = () => {
  return (
    <Box>
        <ProductList category="kids" limit="6"/>
    </Box>
  )
}

export default Kids

