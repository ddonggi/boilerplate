const express = require('express') //다운받은 express를 가져온다
const app = express() //express의 함수를 이용해서 새로운 express app을 만든다
const port = 3000 //port
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//body parser 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는거

//apllication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')//모듈 가져오기, 몽고db 연결

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected success!'))
    .catch( err => console.log('error!!'));





app.get('/', (req, res) => {
  res.send('Hello World! ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ');
});

//회원가입을 위한 라우트
app.post('/api/user/register' //endpoint
, (req,res)=>{const user = new User(req.body);
  //클라이언트에서 보내주는 정보들을 가져오면 DB에 넣어준다.
  

  user.save((err,user)=>{
    if(err) return res.json({success:false,err})//
      return res.status(200).json({succes:true});//////////////
     
    });//몽고db 메쏘드
});

app.post('/api/user/login', (req,res) => {
  //요청된 이메일을 DB에서 있는지 찾기
  User.findOne({email:req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess:false,
        message:"해당하는 유저가 없습니다"
      })
    }
    //요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인하기
    user.comparePassword(req.body.password , (err, isMatch) =>{


      if(!isMatch)
        return res.json({loginSuccess:false, message:"비밀번호가 맞지 않습니다."});

      //비밀번호가 맞다면 Token 생성
      //토큰 생성을 위해 JSONWEBTOKEN 라이브러리 이용
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, 로컬? 우선은 쿠키에..
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true,userId:user._id})

      })  
    })

  })
  


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
