const express = require('express') //다운받은 express를 가져온다
const app = express() //express의 함수를 이용해서 새로운 express app을 만든다
const port = 3000 //port
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//body parser 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는거

//apllication/json
app.use(bodyParser.json());

const mongoose = require('mongoose')//모듈 가져오기, 몽고db 연결

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected success!'))
    .catch( err => console.log('error!!'));





app.get('/', (req, res) => {
  res.send('Hello World! ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ');
});

//회원가입을 위한 라우트
app.post('/register' //endpoint
, (req,res)=>{const user = new User(req.body);
  //클라이언트에서 보내주는 정보들을 가져오면 DB에 넣어준다.
  

  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})//
      return res.status(200).json({succes:true});//////////////
     
    });//몽고db 메쏘드
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
