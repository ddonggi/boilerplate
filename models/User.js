const mongoose = require('mongoose');

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

//스키마를 Model로 감싸준다
const User = mongoose.model('User',UserSchema);

module.exports = { User }; //exports로 다른곳에서도 쓸 수 있다.