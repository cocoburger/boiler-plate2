import {
    LOGIN_USER, REGISTER_USER
}from '../_actions/types';

//reducer는 previous state과 action을 가지고 nextState을 return하니깐 파라미터로 state, action을 받는다.
//스프레드 operator를 찾아보자~ 배열복사
//타입이 많아질거니깐 switch문법을 이용해서 처리
//payload를 loginSuccess에 저장 


export default function (state = {}, action){
    switch(action.type){
        case LOGIN_USER:
                return{ ...state, loginSuccess:action.payload} 

        case REGISTER_USER:
            return {...state, regiser:action.payload}

        default:
            return state;
    }

}