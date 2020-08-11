const express = require('express') //다운받은 express를 가져온다
const app = express() //express의 함수를 이용해서 새로운 express app을 만든다
const port = 3000 //port
const mongoose = require('mongoose')//모듈 가져오기, 몽고db 연결

mongoose.connect('mongodb+srv://Donggi:kkwe1068@boilerplate.hillj.mongodb.net/BoilerPlate?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected success!'))
    .catch( err => console.log('error!!'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
