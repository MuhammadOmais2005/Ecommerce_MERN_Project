import React, { useState } from 'react'
import { Container, Box, FormLabel, Typography, TextField, Button, MenuItem, Select, FormControl, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { Controller } from "react-hook-form";
import subtotal from '../../utils/SubTotal';


const Checkout = () => {

  const { currentAccount } = useSelector((state) => {
    return state.accountList
  });

  const { cartList } = useSelector((state) => {
    return state.cartList
  })

  const shipmentCost = 500;

  const [stockError, setStockError] = useState(null)
  const [loading, setLoading] = useState(false)


  const { register, clearErrors, control, setError, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      paymentMethod: "cod"
    }
  })

  const onSubmit = async (data) => {
    clearErrors()
    const orderItems = cartList.map((item) => {

      return (
        {
          productId: item._id,
          title: item.title,
          price: item.price,
          images: item.images,
          stock: item.cart.stock,
          category: item.category,
          color: item.color,
          numReviews: item.numReviews,
          rating: item.rating,
          fabric: item.fabric,
          qty: item.cart.qty,
          size: item.cart.size,
        }
      )
    })
    const orderData = {
      user: currentAccount[0].id,
      isDelivered: false,
      isCancelled: false,
      orderItems,
      orderStatus: "Pending",
      shippingPrice: 500,
      totalPrice: subtotal(cartList),
      grandPrice: subtotal(cartList) + 500,
      paymentInfo: {
        method: data.paymentMethod,
        status: "Pending",
        paidAt: null
      },
      shippingAddress: {
        fullName: data.firstName + " " + data.lastName,
        email: currentAccount[0].email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode || null,
        country: data.country,
        state: data.state
      }
    }
    console.log(orderData);

    try {
      const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...orderData })
      });
      // console.log(response)
      const result = await response.json()
      if (result.success && !!response.ok) {
        alert("Ordered successfully.");
        return;
      };
      if (!result.success && result?.availabilityError) {
        setError("root", {
          type: "availabilityError",
          message: result.message, 
          data: result.data
        });
        return;
      }
      if (!result.success && result?.sizeError) {
        setError("root", {
          type: "sizeError",
          message: result.message, 
          data: result.data
        });
        return;
      }
      if (!result.success && result?.stockError) {
        setError("root", {
          type: "stockError",
          message: result.message, 
          data: result.data
        });
        return;
      }
      setError("root", {
        type: "server",
        message: result.message || "Something went wrong"
      })
      console.log(result)
    } catch (err) {
      console.log(err)
      setError("root", {
        type: "server",
        message: err.message || "Something went wrong"
      })
    } finally {
      setLoading(false)
    }
  }


  if (cartList.length <= 0 || !cartList) {
    return (
      <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
        <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
          No item in cart list.
        </Typography>
      </Box>
    )
  }
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 7, md: 4 } }}>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 4 }} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FormLabel>
              <Typography variant="h5" sx={{ mb: 4, color: "primary.main" }}>
                Contact
              </Typography>
            </FormLabel>
            <TextField
              id=""
              label="Email"
              defaultValue={currentAccount[0]?.email}
              {...register("email", {
                required: "Email is required"
              })}
              helperText={"This email will be use as for contact with you."}
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
          <Box>
            <FormLabel>
              <Typography variant="h5" sx={{ mb: 4, color: "primary.main" }}>
                Delivery
              </Typography>
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 3, md: 3 } }}>
                <TextField
                  id=""
                  label="First Name"
                  placeholder='First Name'
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters."
                    }
                  })}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName?.message}
                />
                <TextField
                  id=""
                  label="Last Name"
                  placeholder='Last Name'
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name must be at least 3 characters."
                    }
                  })}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName?.message}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  id=""
                  label="Address"
                  placeholder='Address'
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters."
                    }
                  })}
                  error={!!errors?.address}
                  helperText={errors?.address?.message}
                />
              </Box>

              <Box>
                <TextField
                  select
                  fullWidth
                  label="Country/Region"
                  defaultValue="Pakistan"
                  {...register("country", {
                    required: "Please select country"
                  })}
                >
                  <MenuItem value="Pakistan">
                    Pakistan
                  </MenuItem>
                </TextField>
              </Box>

              <Box>
                <TextField
                  select
                  fullWidth
                  label="City"
                  defaultValue=""
                  {...register("city", {
                    required: "Please select city"
                  })}
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                >
                  {
                    ["Karachi", "Islamabad", "Lahore", "Quetta", "Peshawar", "Multan", "Hyderabad"].map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      )
                    })
                  }
                </TextField>
              </Box>


              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 3, md: 3 } }}>
                <Box>
                  <TextField
                    select
                    fullWidth
                    label="State"
                    placeholder='State'
                    {...register("state", {
                      required: "Please select state"
                    })}
                    error={!!errors?.state}
                    helperText={errors?.state?.message}
                  >
                    {
                      ["Sindh", "Punjab", "Balochistan", "KPK", "Gilgit Baltistan", "Kashmir"].map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>
                      })
                    }
                  </TextField>
                </Box>
                <TextField
                  id=""
                  label="Zip/Postal code"
                  placeholder='Zip/Postal code (optional)'
                  {...register("postalCode", {})}
                  error={!!errors?.postalCode}
                  helperText={errors?.postalCode?.message}
                />
              </Box>
              <Box>
                <TextField
                  id=""
                  fullWidth
                  label="Phone Number"
                  placeholder='Phone Number'
                  defaultValue={"+92"}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+92\d{10}$/,
                      message: "Enter valid Pakistan number (+92XXXXXXXXXX)",
                    },
                  })}
                  error={!!errors?.phone}
                  helperText={errors?.phone?.message}
                />
              </Box>

              <FormControl error={!!errors.paymentMethod}>
                <Typography variant="h5" sx={{ mb: 4, color: "primary.main" }}>
                  Contact
                </Typography>

                <Controller
                  name="paymentMethod"
                  control={control}
                  rules={{ required: "Please select payment method" }}

                  render={({ field }) => (
                    <RadioGroup {...field}
                      fullWidth
                      sx={{ display: "flex", flexDirection: "column", gap: 1, pl: 1 }}
                    >
                      <FormControlLabel
                        fullWidth
                        sx={{ backgroundColor: "card.main", py: 1, borderRadius: "12px" }}
                        value="cod"
                        control={<Radio />}
                        label="Cash on Delivery"
                      />
                      <FormControlLabel
                        sx={{ backgroundColor: "card.main", py: 1, borderRadius: "12px" }}
                        value="card"
                        control={<Radio />}
                        label="Credit Card/Debit Card"
                      />
                    </RadioGroup>
                  )}
                />

                <FormHelperText>
                  {errors.paymentMethod?.message}
                </FormHelperText>
              </FormControl>

              <Box>
                <Typography variant="body1" sx={{ color: "red" }}>
                  {errors?.root?.message}
                </Typography>
              </Box>

              <Box>
                <Button fullWidth size="large" variant='contained' sx={{ backgroundColor: "card.main", color: "secondary.main", py: 2 }} disabled={loading} type="Submit">{loading ? "completing order" : "complete order"}</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { md: "1fr" }, gap: { md: 3 } }}>
            {
              cartList?.map((item) => {
                return (
                  <Box sx={{ display: "flex", gap: { xs: 2 } }}>
                    <Box sx={{ position: "relative" }}>
                      <Box sx={{ width: "80px", height: "auto", borderRadius: "10px" }} component="img" src={item.images[0]}></Box>
                      <Box sx={{ position: "absolute", top: "0px", left: "0px", transform: "translate(-50%, -50%)", backgroundColor: "card.main", color: "secondary.main", borderRadius: "100%", aspectRatio: "1 / 1", width: 26, display: "flex", justifyContent: 'center', alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: "secondary.main" }}>
                          {item.cart.qty}
                        </Typography>
                      </Box >
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.main" }} >
                        {item.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ color: "primary.main" }}>
                          {item.cart.size}
                        </Typography>
                        <Box sx={{ color: "primary.main" }} component="pre"> / </Box>
                        <Typography variant="body2" sx={{ color: "primary.main", textTransform: "capitalize" }}>
                          {item.color}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "primary.main", textTransform: "capitalize" }}>
                        {item.color}
                      </Typography>
                      <Typography variant="body1" color="initial" sx={{ color: "secondary.main" }}>
                        Rs. {item.price * item.cart.qty}
                      </Typography>
                    <Box>
                      <Typography variant="body1" sx={{ color: "red" }}>
                        {(errors?.root?.type == "availabilityError" && errors.root?.data?.productId == item?._id) && `This proudct is not available in stock`}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "red" }}>
                        {(errors?.root?.type == "stockError" && errors?.root.data?.productId == item._id && errors?.root?.data.currStock == 0) && `This product is out of stock`}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "red" }}>
                        {(errors?.root?.type == "stockError" && errors?.root?.data?.productId == item?._id && errors?.root?.data?.currStock > 0) && `Only ${errors?.root?.data?.currStock} item of this product is available.`}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "red" }}>
                        {( errors?.root?.type == "sizeError" && errors?.root?.data?.productId == item?._id  ) && "The product of that size does not exist."}
                      </Typography>
                    </Box>
                    </Box>
                  </Box>
                )
              })
            }

          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" sx={{ color: "primary.main" }}>Sub total</Typography>
              <Typography variant="body1" sx={{ color: "secondary.main" }}>Rs. {subtotal(cartList)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" sx={{ color: "primary.main" }}>Shipment cost</Typography>
              <Typography variant="body1" sx={{ color: "secondary.main" }}>Rs. {shipmentCost}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ color: "primary.main" }}>Grand total</Typography>
              <Typography variant="h6" sx={{ color: "secondary.main" }}>Rs. {shipmentCost + subtotal(cartList)}</Typography>
            </Box>
          </Box>
          {/* <Button size="large" variant='contained' fullWidth sx={{backgroundColor: "card.main", color: "secondary.main", mt: 3}}>Complete Order</Button> */}
        </Box>

      </Box>
    </Container>

  )
}

export default Checkout
