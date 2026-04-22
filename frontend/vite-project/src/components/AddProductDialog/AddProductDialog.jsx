import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Box, FormControl, FormControlLabel, FormGroup, MenuItem, TextField, Typography, Checkbox, IconButton } from '@mui/material'
import { useForm, useFieldArray } from "react-hook-form"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';




const AddProductDialog = ({ openAdd, onCloseAdd, setOpenAdd, setIsSingleProductUpdated }) => {


    const [fileNames, setFileNames] = useState([]);
    const [files, setFiles] = useState([]);


    const { register, control, watch, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: {
            description: [{ value: "" }]
        }
    })


    const { fields, append, remove } = useFieldArray({
        control,
        name: "description"
    });

    const category = watch("category");
    const description = watch("description");
    const sizes = watch(["XS", "S", "M", "L", "XL"]);

    const checkImageError = () => {
        return files?.some((file) => {
            if (file.error && file.error != "") {
                return true
            } else {
                return false
            }
        })
    };

    useEffect(() => {
        if (files.length > 5) {
            setError("imageError", {
                message: "Maximum 5 images are allowed."

            });
            return
        };

        if (files.length <= 5) {
            clearErrors("imageError")
        };

        if (checkImageError()) {
            return;
        }

    }, [files])
    const onSubmit = async (data) => {

        const { XS, S, M, L, XL } = data
        

        if (files.length == 0) {
            setError("imageError", {
                message: "Minimum 1 image is required."
            });
            return
        };


        const { title, price, category, color, fabric, description } = data
        const form = new FormData();
        form.append("title", title)
        form.append("price", price)
        form.append("category", category)
        form.append("color", color)
        form.append("fabric", fabric);
        const variants = []
        if (XS) {
            variants.push({ size: "XS", stock: XS })
        }
        if (S) {
            variants.push({ size: "S", stock: S })
        }
        if (M) {
            variants.push({ size: "M", stock: M })
        }
        if (L) {
            variants.push({ size: "L", stock: L })
        }
        if (XL) {
            variants.push({ size: "XL", stock: XL })
        }

        const cleanedDescription = description.map((desc) => {
            if (desc.value.trim()) {
                return desc.value
            }
        });

        files.forEach((file) => {
            form.append("images", file.file)
        })

        form.append("variants", JSON.stringify(variants));
        form.append("description", JSON.stringify(cleanedDescription));

        for (const [key, value] of form.entries()) {
            console.log(key, value);
        }


        try {
            const response = await fetch("http://localhost:4000/product", {
                method: "POST",
                body: form
            });
            const result = await response.json()
            console.log(result)
            if (!!response.ok && result.success) {
                setIsSingleProductUpdated(result?.data?._id + Date.now())
                setOpenAdd(false)
                alert("Product added successfully.")
            }
        } catch (err) {
            alert("Product failed to add. ")
            console.log(err)
        }
    };


    const validateImageDimensions = (file, src) => {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
                if (img.naturalWidth === 1600 && img.naturalHeight === 2400) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            };

            img.onerror = () => resolve(false);

            img.src = src;
        });
    };


    const addFiles = async (incomingFiles) => {
        const fileArray = Array.from(incomingFiles);

        const newFiles = [];
        const newFileNames = [];

        for (const file of fileArray) {

            const src = URL.createObjectURL(file);

            // Duplicate check
            if (fileNames.includes(file.name)) {
                alert(`${file.name} already exists`);
                continue;
            }

            // Type check
            if (!file.type.startsWith("image/")) {
                newFiles.push({ file, error: "Only image format allowed", src });
                newFileNames.push(file.name);
                continue;
            }

            // Size check
            if (file.size > 419676) {
                newFiles.push({ file, error: "Image must be less than 419,676 bytes", src });
                newFileNames.push(file.name);
                continue;
            }

            // Dimension check
            const isValid = await validateImageDimensions(file, src);

            if (!isValid) {
                newFiles.push({
                    file,
                    error: "Image must be 1600 x 2400",
                    src
                });
                newFileNames.push(file.name);
                continue;
            }

            // Everything OK
            newFiles.push({ file, error: "", src });
            newFileNames.push(file.name);

        }

        setFiles(prev => [...prev, ...newFiles]);
        setFileNames(prev => [...prev, ...newFileNames]);
        const result = [...files, ...newFiles]?.some((file) => {
            if (file.error && file.error != "") {
                return true
            } else {
                return false
            }
        });
        if (result) {
            setError("imageValidation", {
                message: "imageValidation"
            })
        } else {
            clearErrors("imageValidation")
        }
    };

    const handleDelete = (item) => {

        const currentFileNames = [...fileNames]
        const currentFiles = [...files]

        const updatedFiles = currentFiles?.filter((file) => {
            return file.file.name != item.file.name
        })

        const updatedFileNames = currentFileNames?.filter((name) => {
            return name != item.file.name
        });


        setFileNames([...updatedFileNames])
        setFiles([...updatedFiles])

        const result = [...updatedFiles]?.some((file) => {
            if (file.error && file.error != "") {
                return true
            } else {
                return false
            }
        });
        if (result) {
            setError("imageValidation", {
                message: "imageValidation"
            })
        } else {
            clearErrors("imageValidation")
        }
    }

    const handleFileChange = (e) => {
        addFiles(e.target.files)
    }


    return (
        <Dialog open={openAdd} onClose={onCloseAdd}
            PaperProps={{
                sx: {
                    width: {
                        xs: "95%",   // mobile
                        sm: 500,     // small screens
                        md: 700,     // medium screens
                        lg: 900      // large screens
                    },
                    maxWidth: "none"
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h5" color="initial" sx={{ fontWeight: 600 }}>
                    ADD A NEW PRODUCT
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box id="add-proudct-form" component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }} onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" } }}>
                        <Box>
                            <TextField
                                fullWidth
                                label="Title"
                                margin='normal'
                                error={!!errors.title}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.title?.message}
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Title is required"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters are allowed"
                                    }
                                })}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Color"
                                margin='normal'
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.color}
                                helperText={errors?.color?.message}
                                {...register("color", {
                                    required: {
                                        value: true,
                                        message: "Color is required"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters are allowed"
                                    }
                                })}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" } }}>
                        <Box>
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                margin='normal'
                                error={!!errors.price}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.price?.message}
                                {...register("price", {
                                    valueAsNumber: true,
                                    required: {
                                        value: true,
                                        message: "Price is required"
                                    },
                                    min: {
                                        value: 1,
                                        message: "Minimum 1 rupee is allowed"
                                    }
                                })}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Fabric"
                                margin='normal'
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.fabric}
                                helperText={errors?.fabric?.message}
                                {...register("fabric", {
                                    required: {
                                        value: true,
                                        message: "Fabric is required"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters are allowed"
                                    }
                                })}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
                        <Box>
                            <TextField
                                fullWidth
                                label="Size XS"
                                type="number"
                                margin='normal'
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                error={!!errors.XS}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.XS?.message}
                                {...register("XS", {
                                    setValueAs: (value)=>{
                                        if(Number(value) == 0 || value == ""){
                                            return null
                                        }else {
                                            return Number(value)
                                        }
                                    },
                                    validate: ()=>{
                                        const isValid = sizes.some((size)=>{
                                            return size > 0 && size != 0
                                        })
                                        console.log(isValid)
                                        if(!isValid){
                                            setError("sizeError", {
                                                message: "At lest one size should be greater than 0."
                                            });
                                            return false;
                                        } else {
                                            clearErrors("sizeError"); 
                                            return true
                                        }
                                    },
                                    min: {
                                        value: 0,
                                        message: "size must be non negative."
                                    }
                                })}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Size S"
                                type="number"
                                margin='normal'
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                error={!!errors.S}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.S?.message}
                                {...register("S", {
                                    setValueAs: (value)=>{
                                        if(Number(value) == 0 || value == ""){
                                            return null
                                        }else {
                                            return Number(value)
                                        }
                                    },
                                    validate: ()=>{
                                        const isValid = sizes.some((size)=>{
                                            return size > 0 && size != 0
                                        })
                                        console.log(isValid)
                                        if(!isValid){
                                            setError("sizeError", {
                                                message: "At lest one size should be greater than 0."
                                            });
                                            return false;
                                        } else {
                                            clearErrors("sizeError"); 
                                            return true
                                        }
                                    },
                                    min: {
                                        value: 0,
                                        message: "size must be non negative."
                                    }
                                })}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Size M"
                                type="number"
                                margin='normal'
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                error={!!errors.M}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.M?.message}
                                {...register("M", {
                                    setValueAs: (value)=>{
                                        if(Number(value) == 0 || value == ""){
                                            return null
                                        }else {
                                            return Number(value)
                                        }
                                    },
                                    validate: ()=>{
                                        const isValid = sizes.some((size)=>{
                                            return size > 0 && size != 0
                                        })
                                        console.log(isValid)
                                        if(!isValid){
                                            setError("sizeError", {
                                                message: "At lest one size should be greater than 0."
                                            });
                                            return false;
                                        } else {
                                            clearErrors("sizeError"); 
                                            return true
                                        }
                                    },
                                    min: {
                                        value: 0,
                                        message: "size must be non negative."
                                    }
                                })}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Size L"
                                type="number"
                                margin='normal'
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                error={!!errors.L}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.L?.message}
                                {...register("L", {
                                    setValueAs: (value)=>{
                                        if(Number(value) == 0 || value == ""){
                                            return null
                                        }else {
                                            return Number(value)
                                        }
                                    },
                                    validate: ()=>{
                                        const isValid = sizes.some((size)=>{
                                            return size > 0 && size != 0
                                        })
                                        console.log(isValid)
                                        if(!isValid){
                                            setError("sizeError", {
                                                message: "At lest one size should be greater than 0."
                                            });
                                            return false;
                                        } else {
                                            clearErrors("sizeError"); 
                                            return true
                                        }
                                    },
                                    min: {
                                        value: 0,
                                        message: "size must be non negative."
                                    }
                                })}


                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Size XL"
                                type="number"
                                margin='normal'
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                error={!!errors.XL}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.XL?.message}
                                {...register("XL", {
                                    setValueAs: (value)=>{
                                        if(Number(value) == 0 || value == ""){
                                            return null
                                        }else {
                                            return Number(value)
                                        }
                                    },
                                    validate: ()=>{
                                        const isValid = sizes.some((size)=>{
                                            return size > 0 && size != 0
                                        })
                                        console.log(isValid)
                                        if(!isValid){
                                            setError("sizeError", {
                                                message: "At lest one size should be greater than 0."
                                            });
                                            return false;
                                        } else {
                                            clearErrors("sizeError"); 
                                            return true
                                        }
                                    },
                                    min: {
                                        value: 0,
                                        message: "size must be non negative."
                                    }
                                })}

                            />
                        </Box>

                    </Box>


                    {
                        !!errors?.sizeError && (
                            <Typography sx={{ color: "red" }} variant="body2" >
                                {errors?.sizeError?.message}
                            </Typography>
                        )
                    }




                    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" } }}>
                        <Box>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                margin='normal'
                                error={!!errors.category}
                                InputLabelProps={{ shrink: true }}
                                helperText={errors?.category?.message}
                                {...register("category", {
                                    required: {
                                        value: true,
                                        message: "Category is required"
                                    },

                                })}

                            >
                                {
                                    ["men", "women", "kids"].map((item, index) => {
                                        return (
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked
                                                {...register("isActive")}
                                            />
                                        }
                                        label="Is Active"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={category != "kids"}
                                                {...register("isBoy")}
                                            />
                                        }
                                        label="Is Boy"
                                    />
                                </FormGroup>
                            </Box>
                        </Box>
                    </Box>



                    {/* Description */}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: { xs: 3, lg: 4 } }}>
                            {
                                fields?.map((field, index) => {
                                    return (
                                        <Box sx={{ display: "flex", alignItems: "center" }} key={field.id}>
                                            <TextField
                                                id=""
                                                label="Description"
                                                fullWidth
                                                {...register(`description.${index}.value`, {
                                                    required: {
                                                        value: true,
                                                        message: "Description is required"
                                                    }
                                                })}
                                                error={errors?.description?.[index]?.value}
                                                helperText={errors?.description?.[index]?.value?.message}
                                            />
                                            <IconButton disabled={fields?.length == 1} onClick={() => remove(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        <Box>
                            <Button size="large" variant='contained' disabled={!(description?.[description?.length - 1]?.value?.trim())} onClick={() => (append({ value: "" }))}>
                                Add new description
                            </Button>
                        </Box>
                    </Box>




                    {/* Upload Files */}

                    <Box>
                        <Button
                            component="label"
                            size='large'
                            variant='contained'
                            endIcon={<CloudUploadIcon />}
                        >
                            <input

                                type='file'
                                //   value={}
                                hidden
                                multiple
                                onChange={handleFileChange}

                            />
                            Upload Files
                        </Button>
                    </Box>


                    {/* Preview Images */}

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr 1fr" }, gap: { xs: 1, lg: 2 } }}>
                        {
                            files?.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ position: "relative" }}>
                                            <Box component={"img"} src={item.src} sx={{ width: "100%", heigth: "auto" }}></Box>
                                            <IconButton sx={{ position: "absolute", top: 3, right: 3 }} onClick={() => handleDelete(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body1" sx={{ color: "red" }}>{item.error}</Typography>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{ color: "red" }}>
                            {errors?.imageError?.message}
                        </Typography>
                    </Box>


                </Box>
            </DialogContent>
            <DialogActions sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 0 }, px: { xs: 5, md: 3 } }}>
                <Button
                    sx={{ width: { xs: "100%", md: "auto" } }}
                    variant='outlined'
                    size="large"
                    onClick={() => setOpenAdd(false)}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    sx={{ width: { xs: "100%", md: "auto" } }}
                    form="add-proudct-form"
                    type='Submit'
                    variant='contained'
                    size="large"
                    color="primary"
                >
                    add a new product
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProductDialog
