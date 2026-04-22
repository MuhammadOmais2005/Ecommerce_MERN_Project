import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux/dashboardAuthSlice'
import { NavLink, useNavigate } from 'react-router-dom'

const DashboardProfile = () => {

  const [successMessage, setSuccessMessage] = useState("")
  const { adminCurrentAccount, adminAccountList } = useSelector((state) => {
    return state.dashboardAuth
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getLogOut = () => {
    setSuccessMessage("Logout successfully.")
    setTimeout(() => {
      setSuccessMessage("")
      dispatch(logOut())
      navigate("/", { replace: true })
    }, 3000)

  }

  const getDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/unregister`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: adminCurrentAccount[0].email, role: "admin" })
      })
      const result = await response.json()
      // console.log({email: currentAccount[0].email, role: "user"})
      console.log(result)
      if (response.ok && result.success) {
        setSuccessMessage("Account deleted successfully.")
        setTimeout(() => {
          setSuccessMessage("")
          dispatch(logOut())
          navigate("/", { replace: true })

        }, 3000)
        return
      }
      alert("Account deletion Failed")
    } catch (err) {
      console.log(err)
      alert("Account deletion Failed")
    }
  }
  // useEffect(()=>{
  //   if(currentAccount.length == 0){
  //     navigate("/", {replace: true})
  //   }
  // },[accountList])
  return (
    <Container sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, backgroundColor: "card.main", p: 3, borderRadius: "2%" }}>
        <Box>
          <Typography variant="h6" sx={{ color: "primary.main", textTransform: "capitalize" }}>
            {adminCurrentAccount[0]?.username}
          </Typography>
          <Box>
            <Typography variant="body1" color="initial">
              <Button onClick={getLogOut}>LogOut</Button>{"  " + "/" + " "}
              <Button onClick={getDeleteAccount}>Delete account</Button>
              {/* {"  " + "/" + " "} */}
              {/* <Box component={NavLink} to="/dashboard-register">
                <Button>Create new account</Button>
              </Box> */}

            </Typography>

          </Box>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ color: "secondary.main" }}>
            {adminCurrentAccount[0]?.email}
          </Typography>
        </Box>
      </Box>

      {
        successMessage ? (
          <Alert sx={{zIndex: 10000, position: "fixed", top: "2%", left: "50%", transform: "translateX(-50%)" }} onClose={() => { setSuccessMessage("") }}>
            {successMessage}
          </Alert>
        ) : ""
      }
    </Container>
  )
}

export default DashboardProfile
