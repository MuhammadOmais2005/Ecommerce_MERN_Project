import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { Box } from '@mui/material' 

const SortProducts = ({ sort, setSort }) => {
    return (
        <Box sx={{minWidth: {xs: "120px" , sm: "200px", md: "250px"}}}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                <Select
                    label="Sorting"
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)} 
                    displayEmpty
                >
                    <MenuItem value="">
                        Sorting
                    </MenuItem>
                    <MenuItem value="price_asc">Sort by price(low to high)</MenuItem>
                    <MenuItem value="price_desc">Sort by price(high to low)</MenuItem>
                    <MenuItem value="rating">Sort by higher rating</MenuItem>
                    <MenuItem value="newest">Sort by newest products</MenuItem>
                    <MenuItem value="oldest">Sort by oldest products</MenuItem>
                </Select>
            </FormControl>

        </Box>
    )
}

export default SortProducts
