const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//salt를 이용해서 비밀번호를 암호화
//saltRounds = 자리, 10이면 10자리

const jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 50
    },
    email:{
        type: String,
        trim : true, //공백이 있을시 붙여준다
        unique:1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type:Number,
        default: 0
    },
    imange: String,
    token:{
        type:String
    },
    tokenExp:{//유효기간
        type:Number
    }
})
//몽구스 메쏘드
UserSchema.pre('save',function( next ){
    const user = this;
    //비밀번호 암호화 bcrypt

    if(user.isModified('password')){

    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err) return next(err);

        bcrypt.hash(user.password,salt, function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next()
        })
    })
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function(plainPassword, callback){
    //plainPassword 1234567  암호화된 비밀번호와 같은지? 비교하기 위해
    //암호화를 해준다
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err)
            return callback(err);
        callback(null,isMatch);

    })
}

UserSchema.methods.generateToken = function(callback){
    //jsonwebtoken을 이용해서 토큰 생성하기
    const user=this;

    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    // user._id + 'secretToken'= token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err,user){
        if(err) return callback(err)
        callback(null,user)
    })
}

UserSchema.statics.findByToken = function(token, callback){
    let user = this;
    //토큰을 decode 한다.
    jwt.verify(token,'secretToken',function(err, decoded){
        //유저아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token},function (err, user){
            if(err) return callback(err);

            callback(null,user);
        })
    })
}

//스키마를 Model로 감싸준다
const User = mongoose.model('User',UserSchema);

module.exports = { User }; //exports로 다른곳에서도 쓸 수 있다.