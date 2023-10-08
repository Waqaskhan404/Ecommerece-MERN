const catchAsyncError = require("../middleware/catchAsyncError");
const Product=require("../model/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler")


// Create Product  -- Admin
exports.createProduct=catchAsyncError(async(req,res)=>{

    const  products=await Product.create(req.body);
    res.status(201).json({
        success:true,
        products
    })
});


// Get All Products

exports.getAllProducts=catchAsyncError(async(req,res)=>{
    const resultPerPage=5;
    const productCount=await Product.countDocuments();
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products=await apiFeatures.query;
    res.status(200).json({success:true,products});
})


// Update Product -- Admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        });
    }
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
    res.status(200).json({success:true,product});
});


// Get Single Product -- Product Details
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not Found"
        // });
    }
    res.status(200).json({success:true,product,productCount});
});





// Delete Product -- Admin
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        });
    }
        await product.deleteOne();
    res.status(200).json({success:true,message:"Product deleted Successfully"});
});
