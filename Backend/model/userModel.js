const mongoose=require("mongoose");
const validator=require("validator")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name cannot exceed 30 characters "],
        minLength:[4,"Name should have at least 4 characters "],
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Pleas Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password must be at least 8 character long"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports=mongoose.model("User",userSchema);