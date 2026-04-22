import { configureStore } from "@reduxjs/toolkit" 
import themeReducer from "./themeSlice" 
import wishListReducer from "./wishListSlice" 
import cartListReducer from "./cartListSlice" 
import accountListReducer from "./accountListSlice" 
import dashboardAuthReducer from "./dashboardAuthSlice" 

const store = configureStore({
    reducer: {
        theme: themeReducer, 
        wishList: wishListReducer,
        cartList: cartListReducer,
        accountList: accountListReducer, 
        dashboardAuth: dashboardAuthReducer
    }
})
export default store







// Conditional Rendering

// function ResponsiveAppBar() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
//   return (
//     <AppBar>
//       <Toolbar>
//         <Typography variant="h6">My App</Typography>
//         {!isMobile && (
//           <nav>
//             <Button>Home</Button>
//             <Button>About</Button>
//             <Button>Contact</Button>
//           </nav>
//         )}
//         {isMobile && (
//           <IconButton>
//             <MenuIcon />
//           </IconButton>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// Dynamic Styling

// function ResponsiveGrid() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   return (
//     <Grid container spacing={isMobile ? 1 : 3}>
//       <Grid item xs={isMobile ? 12 : 6}>
//         <Card>Item 1</Card>
//       </Grid>
//       <Grid item xs={isMobile ? 12 : 6}>
//         <Card>Item 2</Card>
//       </Grid>
//     </Grid>
//   );
// }


