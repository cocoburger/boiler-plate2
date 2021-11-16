import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser} from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";
function LoginPage(props) {
    /*
    input창에 값을 변경하고 싶다 -> state를 변경해야한다. -> state를 만들어야 한다.
    ->state값이 변경되면 ->value가 변경된다.
    onChange에 함수를 집어넣고, 
    그 함수에 set변수명(e.currentTarget.value)를 작성한다.
    */

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.currentTarget.value)
    }

    //리엑트에서 이벤트 처리하는 문법이 살짝 다르다잉
    //1.카멜케이스(camelCase)를사용한다. 'onClick={함수}'
    //이벤트의 값이 false여도 기본 동작(새로고침)을 방지할 수 없다. 
    //그렇기 때문에 preventDefault메서드를 사용하자
    
    const onSubmitHandler = (e) =>{
       e.preventDefault();


        //서버에다가 값을 보낼때는 axios를 사용해서 보낸다.

        let body = {
            email: Email,
            password: Password
        }

        //상태(state)값을 변경하기 위해서는 
        //dispatch는 action을 파라미터로 받아서 reducer로 넘겨주는 역할을한다.
        //dispatch 영어 뜻 자체가 보내다, 급파라는 뜻이 있다.
        dispatch(loginUser(body)).then(response => {
            if(response.payload.loginSuccess) {
               navigate('/');
            }else{
                alert('error')
            }
        })

       
    }
    return (
        <div style={{  display:'flex', justifyContent: 'center', alignItems:'center'
        , width:'100%', height:'100vh' 
        }}>
            <form style={{ display:'flex', flexDirection:'column' }}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br/>
                <button type="submit">Login</button>


            </form>

        </div>
    )
}

export default LoginPage;
