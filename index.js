//express모듈은 가져온다
const express = require('express')
//function을 이용해서 app을 만들고
const app = express()
//서버포트
const port = 5000
//mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Mikey:asdf1234@boilerplate.tokqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {   
}).then(() => console.log('MongoDB Connected....')).catch(err => console.log(err))



//hello world 출력
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})





//port 5000번에서 실행시켜준다.
//listen : 연결을 수신하는 HTTP 서버를 시작합니다.
//지정된 호스트 및 포트에서 연결을 바인딩하고 수신 대기합니다. 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})