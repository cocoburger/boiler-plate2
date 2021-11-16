import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate  } from "react-router-dom";
function RegisterPage(props) {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");



    const onEmailHandler = (e) =>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.currentTarget.value)
    }

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }

    //리엑트에서 이벤트 처리하는 문법이 살짝 다르다잉
    //1.카멜케이스(camelCase)를사용한다. 'onClick={함수}'
    //이벤트의 값이 false여도 기본 동작(새로고침)을 방지할 수 없다. 
    //그렇기 때문에 preventDefault메서드를 사용하자
    
    const onSubmitHandler = (e) =>{
       e.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호확인이 같지 않습니다.');
        }
        //서버에다가 값을 보낼때는 axios를 사용해서 보낸다.

        let body = {
            email: Email,
            password: Password,
            name : Name
        }

        //상태(state)값을 변경하기 위해서는 
        //dispatch는 action을 파라미터로 받아서 reducer로 넘겨주는 역할을한다.
        //dispatch 영어 뜻 자체가 보내다, 급파라는 뜻이 있다.
        dispatch(registerUser(body)).then(response => {
            if (response.payload.success) {
                navigate("/login");
            } else {
                alert("Failed to sign up")
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Confrim password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br/>
                <button type="submit">회원 가입</button>

            </form>

        </div>
    )
}

export default RegisterPage;