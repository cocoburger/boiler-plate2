
//유저 정보를 가져와서 token 비교
const { User } = require('../models/User');

let auth = (req, res, next) =>{

    //인증처리를 하는 곳

    // 클라이언트에서 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //토큰을 Decode(복호화) 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err; //에러발생시 애러 던지고
        if(!user) return res.json({isAuth : false, error: true}) //유저 없으면 없다고 에러던지고

        //유저 있으면 req에 넣음으로써 다른데에서도 사용할 수 있게 해준다.
        req.token = token;
        req.user =user;
        next(); //next가 있어야지 미들웨어를 빠져나갈 수 있다.

    })
}
//외부에서 쓸 수 있게
module.exports = { auth  };