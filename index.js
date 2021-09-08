//express모듈은 가져온다
const express = require('express')
//function을 이용해서 app을 만들고
const app = express()
//서버포트
const port = 5000
//유저 정보 등록

const config = require('./config/key');

//body-parser가 내장되었기 때문에 강의와는 다르게 코드 작성
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const{ User } = require("./models/User");



//mongoose
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {   
}).then(() => console.log('MongoDB Connected....')).catch(err => console.log(err))



//hello world 출력
app.get('/', (req, res) => {
  res.send('Hello World! ')
})



app.post('/register', (req, res) =>{
  //회원가입할때 적는 정보들을 client에서 가져오면
  //그 정보들을 데이터 베이스에 넣어준다.
  //인스턴스 생성

  //req.body는 json형식으로 값이 들어가 있다. why? body-parser때문에

  const user = new User(req.body);
  //몽고DB에서 오는 메소드
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  }); 
})


//port 5000번에서 실행시켜준다.
//listen : 연결을 수신하는 HTTP 서버를 시작합니다.
//지정된 호스트 및 포트에서 연결을 바인딩하고 수신 대기합니다. 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})