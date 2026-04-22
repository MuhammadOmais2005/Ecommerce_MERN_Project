import React from 'react'
import ProductList from '../../components/ProductList/ProductList' 
import { Box } from '@mui/material'

const Women = () => {
  return (
    <Box>
        <ProductList category="women" limit="8"/>
    </Box>
  )
}

export default Women
