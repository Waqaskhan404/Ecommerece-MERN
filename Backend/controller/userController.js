const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const User=require("../model/userModel");


exports.registerUser=catchAsyncError(async (req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"This is sample id",
            url:"This is sample url"
        }

    });

    res.status(201).json({
        success:true,
        user
    })

})