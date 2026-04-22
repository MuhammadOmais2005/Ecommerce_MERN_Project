import React, { use, useCallback, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { Box, IconButton, Paper, Typography, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { debounce } from 'lodash';


const DashboardFilterDrawer = ({ drawerOpen, setDrawerOpen, price, setPrice, filter, isFilterLoading, isFilterError, setFabric, fabric, color, setColor, size, setSize, currPrice, setCurrPrice }) => {


    const handleSetPrice = useCallback(
        debounce((value) => {
            setPrice(value)
        }, 5000, { leading: false, trailing: true })
        , [])
    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}


        >
            <Box sx={{ px: 3, width: {xs: "250px", lg: "300px", height: "100vh", overflow: "auto", py: 4 } }}>
                <Box sx={{py: {xs: 3, mg: 4}}}>
                    {
                    isFilterLoading ? (
                        <Box>
                            <Typography variant="body1" sx={{color: "primary.main"}}>
                                Loading...
                            </Typography>
                        </Box>
                    ) : isFilterError ? (
                        <Box>
                            <Typography variant="body1" sx={{color: "primary.main"}}>
                                {isFilterError.message}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
                            {/* Header */}

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{textTransform: "capitalize",fontSize: "17px", cursor: "pointer", color: "primary.main"}}>
                                    Clear all
                                </Box>
                                <Box sx={{cursor: "pointer"}}>
                                    <CloseIcon />
                                </Box>
                            </Box>



                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="body1" sx={{color: "primary.main", fontSize: "17px"}}>
                                        Price
                                    </Typography>
                                    <Button sx={{textTransform: "capitalize",fontSize: "17px"}} onClick={() => { setPrice([null, null]), setCurrPrice([filter?.price?.min, filter?.price?.max]) }}>
                                        Clear
                                    </Button>

                                </Box>
                                <Box sx={{px: 1}}>
                                    <Slider
                                        min={filter.price.min}
                                        max={filter.price.max}
                                        value={currPrice}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        onChange={(e, newValue) => {
                                            setCurrPrice(newValue), handleSetPrice(newValue)
                                        }}


                                    />
                                </Box>
                            </Box>


                            {/* Fabric */}

                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Typography variant="body1" sx={{color: "primary.main", fontSize: "17px"}}>Fabrics</Typography>
                                    <Button sx={{textTransform: "capitalize",fontSize: "17px"}} onClick={() => setFabric("")}>
                                        Clear
                                    </Button>
                                </Box>
                                <FormControl>

                                    <RadioGroup
                                        value={fabric}
                                        onChange={(e) => setFabric(e.target.value)}
                                    >
                                        {
                                            filter?.fabrics.map((fabric) => {
                                                return (
                                                    <FormControlLabel value={fabric} control={<Radio />} label={fabric} />

                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>


                            {/* Colors */} 


                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Typography variant="body1" sx={{color: "primary.main", fontSize: "17px"}}>Colors</Typography>
                                    <Button sx={{textTransform: "capitalize",fontSize: "17px"}} onClick={() => setColor("")}>
                                        Clear
                                    </Button>
                                </Box>
                                <FormControl>

                                    <RadioGroup
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    >
                                        {
                                            filter?.colors.map((color) => {
                                                return (
                                                    <FormControlLabel value={color} control={<Radio />} label={color} />

                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>


                            
                            {/* Sizes */} 


                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <Typography variant="body1" sx={{color: "primary.main", fontSize: "17px"}}>Sizes</Typography>
                                    <Button sx={{textTransform: "capitalize",fontSize: "17px"}} onClick={() => setSize("")}>
                                        Clear
                                    </Button>
                                </Box>
                                <FormControl>

                                    <RadioGroup
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    >
                                        {
                                            filter?.sizes.map((size) => {
                                                return (
                                                    <FormControlLabel value={size} control={<Radio />} label={size} />

                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>



                        </Box>

                    )
                }

                </Box>
                
            </Box>


        </Drawer>
    )
}

export default DashboardFilterDrawer
