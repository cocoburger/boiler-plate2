const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
//salt는 몇글자인지 초기화시켜야한다.
const saltRound = 10;
const jwt = require('jsonwebtoken');

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

//index.js에서 user.save()를 실행하기전(pre)에 아래 함수를 실행시킨다 -> 패스워드 암호화
userSchema.pre('save', function( next ){
    var user = this;
    if(user.isModified('password')){

    //salt를 이용해서 비밀번호를 암호화 해야 함.
    //먼저 salt를 생성해야함.
    bcrypt.genSalt(saltRound,function(err,salt){
        if(err) return next(err)


        bcrypt.hash(user.password, saltRound, function(err, hash){
            if(err) return next(err)

            user.password = hash
            next()
        });
    });
  }else{
      next();
  }
});

    userSchema.methods.comparePassword = function(plainPassword, cb){
        //비밀번호를 비교하는 메소드
        bcrypt.compare(plainPassword, this.password, function(err, isMatch){
            if(err) return cb(err); //false 틀림
            cb(null, isMatch); //true  같음
        })
    }

    userSchema.methods.generateToken = function(cb){
        //jsonwebtoken을 이용해서 token을 생성하기
        //유저 정보 가져오기
        var user = this;
        console.log(this);
        //토큰 생성 toHexString()은 
        var token =  jwt.sign(user._id.toHexString(), 'secretToken');

        user.token = token;
        user.save(function(err, user){
            if(err) return cb(err)
            cb(null, user);
        })
    
    // user_id + 'secretToken' = token
    // ->
    // 'secretToken' -> user_id
    }

    userSchema.statics.findByToken = function ( token, cb ) {
        var user = this;

        //토큰을 decode 한다.
        jwt.verify(token, 'secretToken', function(
            err, decoded) {
                //유저 아이디를 이용해서 유저를 찾은 다음에
                //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

                user.findOne({"_id":decoded,"token": token }, function(err, user){
                    if(err) return cb(err);
                    cb(null, user)
                });
            });
    }





//모델로 스키마를 감싸준다.
const User = mongoose.model('User',userSchema)

//이 모델을 다른 파일에서 사용할 수 있게 exports를 해준다.
module.exports = {User }