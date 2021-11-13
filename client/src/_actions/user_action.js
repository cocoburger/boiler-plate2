import axios from 'axios';
import {
    LOGIN_USER
} from './types';
export function loginUser(dataTosubmit) {
    
    //axios를 request에 지정 -> 결론적으로 response된 data를 request에 저장한다.
    //return을 시켜서 reducer에 보내야한다.
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data)

    return{
        type: "LOGIN_USER",
        payload : request
    }
}
