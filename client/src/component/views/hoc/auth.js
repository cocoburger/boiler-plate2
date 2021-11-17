import axios from 'axios';
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action'
//adminRoute 인자는 아무런 값이 없으면 NULL이다. 
export default function (SpecifiComponent, option, adminRoute = null) {

    //null   => 아무나 출입이 가능
    //true   => 로그인한 유저만 출입이 가능한 페이지
    //false  => 로그인한 유저는 출입 불가능 페이지




    function AuthenticationCheck(props) {

        const dispath = useDispatch(auth);
        
        useEffect(() => {

            dispatchEvent(auth().then(response => {
                console.log()
            })
            
          
        }, [])
    }
}