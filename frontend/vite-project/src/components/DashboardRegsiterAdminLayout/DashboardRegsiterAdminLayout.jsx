import React from 'react'
import { Outlet } from 'react-router-dom' 
import DashboardProtectedRoute from '../DashboardProtectedRoute/DashboardProtectedRoute'

const DashboardRegsiterAdminLayout = () => {
  return (
   <DashboardProtectedRoute>
    <Outlet/>
   </DashboardProtectedRoute>
  )
}

export default DashboardRegsiterAdminLayout
