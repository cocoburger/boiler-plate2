const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:20
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default: 0
    },
    image: String,
    token:{
        type:String
    },
    //토큰 유효기간
    tokenExp:{
        type:Number
    }
})

//모델로 스키마를 감싸준다.
const User = mongoose.model('User',userSchema)

//이 모델을 다른 파일에서 사용할 수 있게 exports를 해준다.
module.exports = {User }