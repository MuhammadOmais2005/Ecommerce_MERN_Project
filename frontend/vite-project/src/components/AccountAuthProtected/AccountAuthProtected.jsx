import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { useState, useEffect } from 'react' 
import {Typography} from '@mui/material' 
import { Box } from '@mui/material'

const AccountAuthProtected = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(true)
      const [loading, setLoading] = useState(false)
      const { accountList, currentAccount } = useSelector((state) => {
        return state.accountList
      });
      const navigate = useNavigate()
      const authorize = async (token) => {
        setLoading(true)
        try {
          const response = await fetch("http://localhost:4000/protected-route", {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          if (response.ok) {
            const result = await response.json()
            if (result.success) {
                // navigate("/account/profile", true) 
                setIsAuthorized(true)
              return
            }
            setIsAuthorized(false)
            return
          }  
          setIsAuthorized(false)  
        } catch (err) {
            console.log(false)
        } finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        if (currentAccount?.[0]) {
          authorize(currentAccount[0]?.token)
          return
        } else {
          setIsAuthorized(false)
        }
      }, [accountList])
      if (loading) {
        return (
          <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1" sx={{ color: "primary.main" }}>
              {/* Loading... */}
            </Typography>
          </Box>
        )
      }
      if(!isAuthorized){
        return (
            <Box>
                {children}
            </Box>
        )
      }
}

export default AccountAuthProtected
