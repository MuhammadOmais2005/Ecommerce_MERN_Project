import dotenv from "dotenv"
dotenv.config()
import productModel from "../models/productModel.mjs";
// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;


cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// cloudinaryV2.config({
//     cloud_name: 'da87qbgpq',             // your Cloudinary cloud name
//     api_key: '118478873937556',          // your Cloudinary API key
//     api_secret: 'ACXcol-I62mYgKlJDUjrey3JYMk'  // your Cloudinary API secret
// });

console.log(
    {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
          }
)


const uploadToCloudinary = (buffer, folder = 'products') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};


const getProducts = async (req, res) => {
    try {
        const {
            category, outOfStock, kid,  color, size, minPrice, maxPrice, rating, search, fabric, sort, page, limit
        } = req.query
        const filterQuery = { isActive: true }

        if (category) {
            filterQuery.category = category
        } 
        if(outOfStock){
            filterQuery.variants = {
                $elemMatch: {
                    stock: 0
                }
            }
        }
        if(fabric){
            filterQuery.fabric = fabric
        }
        if(kid){
            if(kid=="boy"){
                filterQuery.isBoy = true
            }else{
                filterQuery.isBoy = false 
            }
        }

        if (color) {
            filterQuery.color = color
        }

        if (minPrice || maxPrice) {
            filterQuery.price = {}
            if (minPrice) { filterQuery.price.$gte = Number(minPrice) }
            if (maxPrice) { filterQuery.price.$lte = Number(maxPrice) }
        }

        if (size) {
            filterQuery["variants.size"] = size
        }

        if (rating) {
            filterQuery.rating = { $gte: Number(rating) };
        }

        if (search) {
            filterQuery.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $elemMatch: { $regex: search, $options: "i" } } }
            ];
        }



        let sortOption = { createdAt: -1 };

        switch (sort) {
            case "price_asc":
                sortOption = { price: 1 };
                break;
            case "price_desc":
                sortOption = { price: -1 };
                break;
            case "rating":
                sortOption = { rating: -1 };
                break;
            case "newest":
                sortOption = { createdAt: -1 };
                break;
            case "oldest":
                sortOption = { createdAt: 1 };
                break;
        }

        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 3,
            sort: sortOption
        };


        console.log(filterQuery)


        const products = await productModel.paginate(filterQuery, options)
        res.status(200).json({ success: true, data: products })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productModel.findById(id)
        if (!product) {
            res.status(400).json({ success: false, error: "invalid product id" })
        }
        res.status(200).json({ success: true, data: product })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

const getFilter = async(req, res)=>{
    try {
        const { category, kid } = req.query 
        console.log(category, "category")
    
        const matchStage = {
          isActive: true
        }
    
        if (category) {
          matchStage.category = category
        } 
        if(kid){
            if(kid == "boy"){
                matchStage.isBoy = true
            }else{
                matchStage.isBoy = false
            }
        }
    
        const priceAgg = await productModel.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: null,
              minPrice: { $min: "$price" },
              maxPrice: { $max: "$price" }
            }
          }
        ])
    
        const colors = await productModel.distinct("color", matchStage)
    
        const sizes = await productModel.distinct("variants.size", matchStage)
        
        const fabrics = await productModel.distinct("fabric", matchStage)
        res.json({
          success: true,
          data: {
            price: {
                min: priceAgg[0]?.minPrice || 0,
                max: priceAgg[0]?.maxPrice || 0
              },
              colors,
              sizes, 
              fabrics
          }
        })
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch filters",
          error: error.message
        })
      }
}
const addProduct = async (req, res) => {
    try {
        const product = req.body

        const files = req.files; // Array of files from multer (memory storage)
        
        // Validate files
        if (!files || files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: "At least one image is required" 
            });
        }

        const uploadPromises = files.map((file)=>{
            
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            return  cloudinary.uploader.upload(dataURI, {
                folder: 'ecommerce',
                resource_type: 'auto'
            });
        })

        // // Upload all images to Cloudinary
        // const uploadPromises = files.map(file => 
        //     uploadToCloudinary(file.buffer, 'ecommerce/products')
        // );

        const results = await Promise.all(uploadPromises);
        
        // Extract secure URLs
        const imageLinks = results.map(img => img.secure_url);

        const parsedProduct = {
            title: req.body.title,
            category: req.body.category,
            price: parseFloat(req.body.price),
            color: req.body.color,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            description: JSON.parse(req.body.description),
            variants: JSON.parse(req.body.variants),
            images: imageLinks
            // images: req.file ? [req.file.filename] : []
        }; 
        console.log(parsedProduct)
        const data = await productModel.create(parsedProduct)
        res.status(201).json({ success: true, data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: err.message })
    }
}


const updateProduct = async(req, res)=>{
    try{
        const id = req.params.id
        const product = req.body

        const files = req.files; // Array of files from multer (memory storage)
    


        let imageLinks = []
        if(files.length>0){
            const uploadPromises = files.map((file)=>{
            
                const b64 = Buffer.from(file.buffer).toString('base64');
                const dataURI = `data:${file.mimetype};base64,${b64}`;
                return  cloudinary.uploader.upload(dataURI, {
                    folder: 'ecommerce',
                    resource_type: 'auto'
                });
            })
    
            // // Upload all images to Cloudinary
            // const uploadPromises = files.map(file => 
            //     uploadToCloudinary(file.buffer, 'ecommerce/products')
            // );
    
            const results = await Promise.all(uploadPromises); 
            imageLinks = results.map(img => img.secure_url);
    
        }
                
        // Extract secure URLs
        

        const parsedProduct = {
            title: req.body.title,
            category: req.body.category,
            price: parseFloat(req.body.price),
            color: req.body.color,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            description: JSON.parse(req.body.description),
            variants: JSON.parse(req.body.variants),
            images: [...JSON.parse(req.body.oldImages),...imageLinks]
            // images: req.file ? [req.file.filename] : []
        }; 
        // console.log(parsedProduct)
        const data = await productModel.findByIdAndUpdate(id, parsedProduct, {new: true}) 
        console.log("data", data, "data")
        res.status(201).json({ success: true, data })
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, error: err.message })
    }
}




const deleteSingleProduct = async(req, res)=>{
    try{
        const id = req.params.id 
        const product = await productModel.findByIdAndDelete(id) 
        if(product){
            console.log(product)
            return res.status(200).json({success: true, message: "product deleted successfully.", data: product})
        }
        return res.status(400).json({success: false, message: "product deleted failed."})
    }catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: err.message})
    }
}
export { addProduct, getProducts, getProduct, getFilter, updateProduct, deleteSingleProduct }









// import productModel from "../models/productModel.mjs";
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: 'da87qbgpq',
//     api_key: '118478873937556',
//     api_secret: 'ACXcol-I62mYgKlJDUjrey3JYMk',
//     secure: true
// });

// console.log('Cloudinary configured with cloud_name:', cloudinary.config().cloud_name);


// const getProducts = async (req, res) => {
//     try {
//         const {
//             category, color, size, minPrice, maxPrice, rating, search, sort, page, limit
//         } = req.query
//         const filterQuery = { isActive: true }

//         if (category) {
//             filterQuery.category = category
//         }

//         if (color) {
//             filterQuery.color = color
//         }

//         if (minPrice || maxPrice) {
//             filterQuery.price = {}
//             if (minPrice) { filterQuery.price.$gte = Number(minPrice) }
//             if (maxPrice) { filterQuery.price.$lte = Number(maxPrice) }
//         }

//         if (size) {
//             filterQuery["variants.size"] = size
//         }

//         if (rating) {
//             filterQuery.rating = { $gte: Number(rating) };
//         }

//         if (search) {
//             filterQuery.$or = [
//                 { title: { $regex: search, $options: "i" } },
//                 { description: { $elemMatch: { $regex: search, $options: "i" } } }
//             ];
//         }



//         let sortOption = { createdAt: -1 };

//         switch (sort) {
//             case "price_asc":
//                 sortOption = { price: 1 };
//                 break;
//             case "price_desc":
//                 sortOption = { price: -1 };
//                 break;
//             case "rating":
//                 sortOption = { rating: -1 };
//                 break;
//             case "newest":
//                 sortOption = { createdAt: -1 };
//                 break;
//             case "oldest":
//                 sortOption = { createdAt: 1 };
//                 break;
//         }

//         const options = {
//             page: Number(page) || 1,
//             limit: Number(limit) || 3,
//             sort: sortOption
//         };


//         console.log(filterQuery)


//         const products = await productModel.paginate(filterQuery, options)
//         res.status(200).json({ success: true, data: products })
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message })
//     }
// }

// const getProduct = async (req, res) => {
//     try {
//         const id = req.params.id
//         const product = await productModel.findById(id)
//         if (!product) {
//             res.status(400).json({ success: false, error: "invalid product id" })
//         }
//         res.status(200).json({ success: true, data: product })
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message })
//     }
// }




// const addProduct = async (req, res) => {
//     console.log('=== ADD PRODUCT REQUEST START ===');
//     console.log('Request body keys:', Object.keys(req.body));
//     console.log('Files count:', req.files?.length || 0);
    
//     try {
//         // Get data from request
//         const { title, category, price } = req.body;
//         const files = req.files || [];
        
//         // Basic validation
//         if (!title || !category || !price) {
//             console.log('Missing required fields');
//             return res.status(400).json({
//                 success: false,
//                 error: 'Title, category, and price are required'
//             });
//         }
        
//         if (files.length === 0) {
//             console.log('No files uploaded');
//             return res.status(400).json({
//                 success: false,
//                 error: 'At least one image is required'
//             });
//         }
        
//         // Upload first image only (for testing)
//         console.log('Uploading first image to Cloudinary...');
//         const file = files[0];
//         const b64 = Buffer.from(file.buffer).toString('base64');
//         const dataURI = `data:${file.mimetype};base64,${b64}`;
        
//         console.log('Data URI created, length:', dataURI.length);
        
//         const uploadResult = await cloudinary.uploader.upload(dataURI, {
//             folder: 'test-products',
//             resource_type: 'auto'
//         });
        
//         console.log('Cloudinary upload successful:', uploadResult.secure_url);
        
//         // Create simple product for testing
//         const productData = {
//             title,
//             category,
//             price: parseFloat(price),
//             color: req.body.color || 'Black',
//             rating: 0,
//             numReviews: 0,
//             description: ['Test description'],
//             variants: [{ size: 'M', stock: 10 }],
//             images: [uploadResult.secure_url]
//         };
        
//         console.log('Creating product in database...');
//         const product = await productModel.create(productData);
        
//         console.log('Product created:', product._id);
//         console.log('=== ADD PRODUCT REQUEST END ===');
        
//         res.status(201).json({
//             success: true,
//             data: product,
//             message: 'Test product created successfully'
//         });
        
//     } catch (error) {
//         console.error('=== ERROR ===');
//         console.error('Error type:', error.constructor.name);
//         console.error('Error message:', error.message);
//         console.error('Error stack:', error.stack);
        
//         if (error.http_code) {
//             console.error('Cloudinary error code:', error.http_code);
//         }
        
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             code: error.http_code || 'UNKNOWN'
//         });
//     }
// };

// export { addProduct, getProducts, getProduct };