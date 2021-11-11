//express모듈은 가져온다
const express = require('express')
//function을 이용해서 app을 만들고
const app = express()
//서버포트
const port = 5000
//유저 정보 등록

const config = require('./config/key');
const cookieParser  = require('cookie-parser');
const { auth } = require('./middleware/auth');
const{ User } = require("./models/User");

//body-parser가 내장되었기 때문에 강의와는 다르게 코드 작성
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());




//mongoose
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {   
}).then(() => console.log('MongoDB Connected....')).catch(err => console.log(err))



//hello world 출력
app.get('/', (req, res) => {
  res.send('Hello World! ')
})

app.get('/api/hello', (req, res) =>{
  
  res.send('안녕하십니까 정상수입니다~~~~~~~~');
})

app.post('/api/users/register', (req, res) =>{
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

//post방식
app.post('/api/users/login',(req,res) =>{

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  //mongoDB에서 제공하는 함수
  //몽고DB 인스턴스에서 mongoose 반환 데이터
  User.findOne({ email: req.body.email  }, (err, user) =>{
    if(!user){ //해당하는 유저가 없다면
      return res.json({  //json타입으로 리턴해준다.
        loginSuccess : false,
        message : "해당 이메일로 가입된 유저가 없습니다."
      })
    }
  
  //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인해야한다.
  user.comparePassword(req.body.password, (err, isMatch) =>{
    if(!isMatch)
    return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
  
    //비밀번호 까지 맞다면 토큰을 생성하기.
    user.generateToken((err, user) =>{
      if(err) return res.status(400).send(err);

      //토큰을 저장한다. 쿠키 로컬 스토리지에
        res.cookie("x_auth", user.token).status(200).json({loginSuccess:true, userId : user._id});

      }) 
    })
  })
});

//미들웨어는 값을 받아온뒤에 처리전 중간에 
app.get('/api/users/auth',auth,(req,res) =>{

  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 라는 말
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role: req.user.role,
    image : req.user.image
  })
})


//로그인된 상태이기 때문에 auth를 넣어준다. 콜백함수
app.get('/api/users/logout', auth, (req, res) =>{

  //로그아웃을 하려는 유저아이디를 req.user.id로 가져와서
  //token을 공백값으로 주어 토큰 값을 없앤다.
  //에러가 발생하면 에러를 보여주고
  //성공 시에는 true 메세지를 보여준다.
  User.findOneAndUpdate({_id: req.user._id},
   {token : ""}, (err,user) =>{
     if(err) return res.json({ success:false, err});
     return res.status(200).send({success: true})
   })
})





//port 5000번에서 실행시켜준다.
//listen : 연결을 수신하는 HTTP 서버를 시작합니다.
//지정된 호스트 및 포트에서 연결을 바인딩하고 수신 대기합니다. 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})