import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"


const DashboardProtectedRoute = ({ children, route }) => {

    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false)
    const { adminCurrentAccount } = useSelector((state) => {
        return state.dashboardAuth
    })
    const navigate = useNavigate()

    const checkAuthorization = async (token) => {
        try {
            const response = await fetch("http://localhost:4000/protected-route", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (response.ok) {
                console.log(result)
                if (result.success) {

                    setIsAuthorized(true)
                    return
                }
                alert(result.message)
                navigate("/dashboard-login")
                return
            }

            alert(result.message || "Something went wrong.")
            navigate("/dashboard-login")
        } catch (err) {
            console.log(err)
            alert(err.message || "Something went wrong.")
            navigate("/dashboard-login")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        // const accountCurrentAccount = JSON.parse(localStorage.getItem("adminCurrentAccount"))
        // if (accountCurrentAccount) {
        //     checkAuthorization(accountCurrentAccount?.[0].token)
        //     return
        // }else{
        //     alert("no token")
        //     navigate("/dashboard-login")
        // }


        // const accountCurrentAccount = JSON.parse(localStorage.getItem("adminCurrentAccount"))
        if (adminCurrentAccount?.[0]) {
            checkAuthorization(adminCurrentAccount?.[0].token)
            return
        } else {
            navigate("/dashboard-login")
        }

    }, [adminCurrentAccount])

    if (loading) {
        return <Box>Loading...</Box>
    }
    if (isAuthorized) {
        return (
            <Box>{children}</Box>
        )
    }
}

export default DashboardProtectedRoute
