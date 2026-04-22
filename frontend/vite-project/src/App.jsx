import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/MainLayout/MainLayout"
import Men from "./pages/Men/Men"
import WishList from "./pages/WishList/WishList"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import Cart from "./pages/Cart/Cart"
import Profile from "./pages/Profile/Profile"
import Women from "./pages/Women/Women"
import Kids from "./pages/Kids/Kids"
import AccountLayout from "./components/AccountLayout/AccountLayout"
import Order from "./pages/Order/Order"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Checkout from "./pages/Checkout/Checkout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Overview from "./pages/Overview/Overview"
import Products from "./pages/Products/Products"
import Orders from "./pages/Orders/Orders"
import DashboardLayout from "./components/DashboardLayout/DashboardLayout"
import DashboardProtectedRoute from "./components/DashboardProtectedRoute/DashboardProtectedRoute"
import DashboardLogin from "./pages/DashboardLogin/DashboardLogin"
import DashboardProfile from "./pages/DashboardProfile/DashboardProfile"
import SignUpAdmin from "./pages/SignUpAdmin/SignUpAdmin"
import DashboardRegsiterAdminLayout from "./components/DashboardRegsiterAdminLayout/DashboardRegsiterAdminLayout"
import { Suspense } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setAdminCurrentAccount, setAdminAccountList } from "./redux/dashboardAuthSlice"  
import { setCurrentAccount, setAccountList } from "./redux/accountListSlice"
import { useEffect } from "react"


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "adminCurrentAccount") {
        const updated = JSON.parse(event.newValue);

        dispatch(setAdminCurrentAccount(updated)); // update redux
      }

      if (event.key === "adminAccountList") {
        const updatedList = JSON.parse(event.newValue);

        dispatch(setAdminAccountList(updatedList));
      }

      if (event.key === "myAccountList") {
        const updated = JSON.parse(event.newValue);

        dispatch(setCurrentAccount(updated)); // update redux
      }

      if (event.key === "myAccountList") {
        const updatedList = JSON.parse(event.newValue);

        dispatch(setAccountList(updatedList));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          lazy: async () => {
            const module = await import("./pages/Home/Home")
            return { Component: module.default }
          }

        },
        {
          path: "men",
          lazy: async () => {
            const module = await import("./pages/Men/Men")
            return { Component: module.default }
          }
        },
        {
          path: "women",
          lazy: async () => {
            const module = await import("./pages/Women/Women")
            return { Component: module.default }
          }
        },
        {
          path: "kids",
          lazy: async () => {
            const module = await import("./pages/Kids/Kids")
            return { Component: module.default }
          }
        },
        {
          path: "about",
          lazy: async () => {
            const module = await import("./pages/About/About")
            return { Component: module.default }
          }
        },
        {
          path: "wish-list",
          lazy: async () => {
            const module = await import("./pages/WishList/WishList")
            return { Component: module.default }
          }
        },
        {
          path: "product-detail/:id",
          lazy: async () => {
            const module = await import("./pages/ProductDetail/ProductDetail")
            return { Component: module.default }
          }
        },
        {
          path: "cart",
          lazy: async () => {
            const module = await import("./pages/Cart/Cart")
            return { Component: module.default }
          }
        },
        {
          path: "/checkout",
          lazy: async () => {
            const module = await import("./pages/Checkout/Checkout")
            return { Component: module.default }
          }
        }
      ]
    },
    {
      path: "account",
      element: <AccountLayout />,
      children: [
        {
          path: "orders",
          lazy: async () => {
            const module = await import("./pages/Order/Order")
            return { Component: module.default }
          }
        },
        {
          path: "profile",
          lazy: async () => {
            const module = await import("./pages/Profile/Profile")
            return { Component: module.default }
          }
        },
      ]
    },
    {
      path: "login",
      lazy: async () => {
        const module = await import("./pages/Login/Login")
        return { Component: module.default }
      }
    },
    {
      path: "signup",
      lazy: async () => {
        const module = await import("./pages/SignUp/SignUp")
        return { Component: module.default }
      }
    },
    {
      path: "reset-password/:token",
      lazy: async () => {
        const module = await import("./pages/ResetPassword/ResetPassword")
        return { Component: module.default }
      }
    },
    {
      path: "dashboard",
      element: <DashboardProtectedRoute><DashboardLayout /></DashboardProtectedRoute>,
      children: [
        {
          index: true,
          lazy: async () => {
            const module = await import("./pages/Overview/Overview")
            return { Component: module.default }
          }
        },
        {
          path: "analytics",
          lazy: async () => {
            const module = await import("./pages/Analytics/Analytics")
            return { Component: module.default }
          }
        },
        {
          path: "products-management",
          lazy: async () => {
            const module = await import("./pages/Products/Products")
            return { Component: module.default }
          }
        },
        {
          path: "orders-management",
          lazy: async () => {
            const module = await import("./pages/Orders/Orders")
            return { Component: module.default }
          }
        },
        {
          path: "profile",
          lazy: async () => {
            const module = await import("./pages/DashboardProfile/DashboardProfile")
            return { Component: module.default }
          }
        }
      ]
    },
    {
      path: "dashboard-login",
      lazy: async () => {
        const module = await import("./pages/DashboardLogin/DashboardLogin")
        return { Component: module.default }
      }
    },
    {
      path: "/",
      element: <DashboardRegsiterAdminLayout />,
      children: [
        {
          path: "dashboard-register",
          lazy: async () => {
            const module = await import("./pages/SignUpAdmin/SignUpAdmin")
            return { Component: module.default }
          }
        },
      ]
    }



  ])


  return (
    <Suspense fallback={<h1>Hello</h1>}>
      <RouterProvider fallbackElement={<h1>Hello this is fallback</h1>} router={router}>
      </RouterProvider>
    </Suspense>

  )
}

export default App



