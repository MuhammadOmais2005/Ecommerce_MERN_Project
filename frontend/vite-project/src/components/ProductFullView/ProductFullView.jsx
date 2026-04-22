import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Box } from '@mui/material'

const ProductFullView = ({ open, setOpen, data }) => {
    return (
        <Dialog maxWidth="md" open={open} onClose={() => setOpen(false)}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "column", gap: {xs: 3, lg: 4}}}>

                    <Box>
                    <Typography variant="body1" sx={{ color: "secondary.main" }}>Title</Typography>
                    <Typography variant="body1" sx={{ color: "primary.main" }}>{data.title}</Typography>
                </Box>



                <Box>
                    <Typography variant="body1" sx={{ color: "secondary.main" }}>Description</Typography>
                    <Typography variant="body1" sx={{ color: "primary.main" }}>{data.description}</Typography>
                </Box>



                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr" }, gap: { xs: 2, lg: 3 } }}>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Category</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data.category}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Price</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data.price}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Color</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data.color}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Fabric</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data.fabric}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Active</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data.isActive ? "True" : "False"}</Typography>
                    </Box>
                </Box>


                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Size and Stock</Typography>
                <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr"}, gap: {xs: 2, lg: 3}}}>
                    {
                        data.variants?.map((item, index) => {
                            return (
                                <Box key={index} sx={{ display: "flex", gap: { xs: 2, lg: 3 } }}>
                                    <Typography variant="body1" sx={{ color: "secondary.main" }}>{item.size}</Typography>
                                    <Typography variant="body1" sx={{ color: "primary.main" }}>{item.stock}</Typography>
                                </Box>
                            )
                        })
                    }
                </Box>

                <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr"}, gap: {xs: 2, sm: 3,  lg: 4}}}>
                    {
                        data.images?.map((item, index) => {
                            return (
                                <Box key={index} component={"img"} src={item} sx={{ width: "100%", height: "auto" }}>

                                </Box>
                            )
                        })
                    }
                </Box>

                </Box>
                
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    color="primary"
                    variant='outlined'
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProductFullView
