import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Box, Button, Container } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useForm } from "react-hook-form"
import { InputAdornment } from '@mui/material'; 

const Newsletter = () => {

  const { register, formState: { errors, refresh}, handleSubmit,  } = useForm()

  const onSubmit = async (data) => {
    refresh()
    console.log(data)
  }

  return (
    <Box sx={{backgroundColor: "card.main", py: 12, mb: 6, mx: "auto", maxWidth: "1536px"}}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center"}}>
        <Typography variant="h5" sx={{ color: "primary.main", textAlign: "center" }}>
          Subscribe on our Newsletter
        </Typography>
        <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
          Get weekly news on upcoming latest offers from our company.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: {xs: "column", sm: 'row' }, justifyContent: "center", alignItems: {xs: "center", sm: "start"}, gap: { xs: 1, lg: 1 } }}>
          <TextField
            id=""
            label=""
            size="small"
            margin="none"
            placeholder={"Email"}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>,
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
          />
          <Button size="medium" type="submit" variant='contained' sx={{backroundColor: "background.default"}}>Subscribe</Button>
        </Box>
      </Box>

    </Box>
  )
}

export default Newsletter
