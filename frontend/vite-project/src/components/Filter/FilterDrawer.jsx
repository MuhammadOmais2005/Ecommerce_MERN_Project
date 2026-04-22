import React, { useCallback, useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import {
  Box, IconButton, Slider, Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel, Typography,
  Button
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from "lodash"


const FilterDrawer = ({ open, setOpen, onClose, price, setPrice, size, setSize, category, color, setColor, kid, setKid, setPage, setSearch }) => {

  const [filterData, setFilterData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);
  const [debouncePrice, setDebouncePrice] = useState(["", ""])

  const fetchFilter = async (params) => {
    try {
      const response = await fetch(`http://localhost:4000/filter/?${params}`)
      const data = await response.json()
      setDebouncePrice([data.data.price.min, data.data.price.max])
      setFilterData(data)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setSize("")
    setPrice(0, 0)
    setColor("")
    const currParams = {}
    if (category) {
      currParams['category'] = category
    }
    if (kid) {
      currParams["kid"] = kid
    }
    const params = new URLSearchParams(currParams)
    fetchFilter(params)
  }, [category, kid])
  useEffect(() => {
    setPage(1)
    setSearch("")
  }, [kid, size, color, price])



  const debouncedPrice = useCallback(
    debounce((value) => {
      setPrice(value)
    }, 5000, { leading: false, trailing: true })
    , []);

  useEffect(() => {
    return () => {
      debouncedPrice.cancel()
    }
  }, [debouncedPrice])




  // const handleSetPrice = (newValue)=>{
  //   setPrice(newValue)
  //   console.log(newValue)
  // }



  // if (isLoading) {
  //   return <h1>Loading...</h1>
  // }
  // if (error) {
  //   return <h1>{error.message}</h1>
  // }
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}

    >

      <Box sx={{ width: { xs: "270px", sm: "300px" }, p: 3, maxHeight: "100vh", overflow: "auto", minHeight: "250px", backgroundColor: "background.default" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "end", gap: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CloseIcon fontSize='large' sx={{ color: "secondary.main" }} onClick={() => setOpen(false)} />
            <Button onClick={() => { setSize(""), setPrice([filterData.data.price.min, filterData.data.price.max]), setColor("") }}>
              Clear all filter
            </Button>
          </Box>

          <Box>
            {
              isLoading ? (
                <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                  <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    Loading...
                  </Typography>
                </Box>
              ) : error ? (
                <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                  <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    {isError.message}
                  </Typography>
                </Box>
              ) : (

                <FormControl sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <FormLabel sx={{ color: "secondary.main" }}>Price</FormLabel>
                      <Button onClick={() => { setDebouncePrice([filterData.data.price.min, filterData.data.price.max]), debouncedPrice([filterData.data.price.min, filterData.data.price.max]) }}>
                        Clear price filter
                      </Button>
                    </Box>

                    <Box sx={{ px: 1 }}>
                      <Slider
                        value={debouncePrice}
                        onChange={(e, newValue) => { setDebouncePrice(newValue), debouncedPrice(newValue) }}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={filterData.data.price.min}
                        max={filterData.data.price.max}
                      />
                    </Box>
                  </Box>

                  <Box>
                    {
                      category == "kids" && (
                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <FormLabel sx={{ color: "secondary.main" }}>Size</FormLabel>
                            <Button onClick={() => { setKid("") }}>
                              Clear kids filter
                            </Button>
                          </Box>
                          <RadioGroup
                            value={kid}
                            onChange={(e) => setKid(e.target.value)}

                          >

                            {
                              ["boy", "girl"].map((item, index) => {
                                return (
                                  <FormControlLabel key={index} control={<Radio />} value={item} label={item}></FormControlLabel>
                                )
                              })
                            }

                          </RadioGroup>

                        </Box>
                      )
                    }
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <FormLabel sx={{ color: "secondary.main" }}>Size</FormLabel>
                      <Button onClick={() => { setSize("") }}>
                        Clear size filter
                      </Button>
                    </Box>

                    <RadioGroup
                      value={size}
                      onChange={(e) => setSize(e.target.value)}

                    >

                      {
                        filterData.data.sizes.map((_size, index) => {
                          return (
                            <FormControlLabel key={index} control={<Radio />} value={_size} label={_size}></FormControlLabel>
                          )
                        })
                      }

                    </RadioGroup>

                  </Box>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <FormLabel sx={{ color: "secondary.main" }}>Color</FormLabel>
                      <Button onClick={() => { setColor("") }}>
                        Clear color filter
                      </Button>
                    </Box>

                    <RadioGroup
                      value={color}
                      onChange={(e) => setColor(e.target.value)}

                    >

                      {
                        filterData.data.colors.map((_color, index) => {
                          return (
                            <FormControlLabel key={index} control={<Radio
                            />} value={_color} label={_color} sx={{
                              '& .MuiFormControlLabel-label': {
                                color: _color,
                                fontWeight: 500
                              }
                            }}></FormControlLabel>
                          )
                        })
                      }

                    </RadioGroup>

                  </Box>
                </FormControl>
              )
            }
          </Box>

        </Box>
      </Box>

    </Drawer>
  )
}

export default FilterDrawer
