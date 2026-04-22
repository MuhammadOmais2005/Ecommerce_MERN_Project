import React from 'react'
import Drawer from '@mui/material/Drawer'
import { Box, Typography, Paper } from '@mui/material'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import totalItem from '../../utils/TotalItem'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IconButton, useTheme } from '@mui/material'
import { toggleTheme } from '../../redux/themeSlice'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';

const HeaderDrawer = ({ onClose, open, setOpen }) => {

    const { mode } = useSelector((state) => {
        return state.theme
    })


    const { cartList } = useSelector((state) => {
        return state.cartList
    })

    const dispatch = useDispatch()
    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{display: {xs: "block", md: "none"}}}
        >

            <Box sx={{ width: { xs: "260px", sm: "250px", md: "300px" }, height: "100%", px: { xs: 2, sm: 3 }, display: "flex", flexDirection: "column", backgroundColor: "background.default"}} >

                <Box sx={{ py: { xs: 2 }, display: { xs: "flex", sm: "none" }, justifyContent: "space-between", alignItems: "center" }}>
                    <Box component={NavLink} sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} to="/cart">
                        <Badge sx={{ color: "inherit" }} badgeContent={totalItem(cartList)} showZero>
                            <ShoppingCartIcon sx={{ color: "inherit" }} />
                        </Badge>
                    </Box>
                    <Box component={NavLink} sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} to="/account/profile">
                        <IconButton sx={{ color: "inherit" }}>
                            <PersonIcon sx={{ color: "inherit" }} />
                        </IconButton>
                    </Box>
                    <IconButton onClick={() => dispatch(toggleTheme())}>
                        {mode ? <DarkModeIcon sx={{ color: "primary.main" }} /> : <LightModeIcon sx={{ color: "primary.main" }} />}
                    </IconButton>
                    <IconButton>
                        <Box component={NavLink} to="/wish-list" sx={{ display: "flex", justifyItems: "center", alignItems: "center", "&.active": { color: "nav.main" }, color: "primary.main" }}>
                            <FavoriteIcon sx={{ color: "inherit" }} />
                        </Box>
                    </IconButton>
                    <IconButton>
                        <Box component={NavLink} to="/dashboard" sx={{ display: "flex", justifyItems: "center", alignItems: "center", "&.active": { color: "nav.main" }, color: "primary.main" }}>
                            <DashboardIcon sx={{ color: "inherit" }} />
                        </Box>
                    </IconButton>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "end" }}>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                </Box>



                <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", flexGrow: 1, alignItems: "center" }}>
                    <Box sx={{ justifyContent: "center", flexDirection: "column", gap: 2, color: "primary.main", display: "flex" }}>
                        <Box to="/" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
                            <Typography variant='h6' component="h2" sx={{ fontWeight: "inherit", color: "inherit" }}>
                                HOME
                            </Typography>
                        </Box>
                        <Box to="/about" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
                            <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                                ABOUT
                            </Typography>
                        </Box>
                        <Box to="/men" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
                            <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                                MEN
                            </Typography>
                        </Box>
                        <Box to="/women" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
                            <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                                WOMEN
                            </Typography>
                        </Box>
                        <Box to="/kids" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
                            <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                                KIDS
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}

export default HeaderDrawer
