import React from 'react'
import './Css/login.css'
import Image from "../Static/snapchat_482451887_1.png"
import { Button } from '@material-ui/core'
import { auth, provider } from '../FireBase/firebase'
import { useStateValue } from '../StateProvider/StateProvider'
import { actionTypes } from '../StateProvider/reducer'

const Login = () => {
    const [{}, dispatch] = useStateValue();
    const handleClick = () => {
       
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user,
           })
            
        }).catch(err => {
            console.log(err);
            
        });
        
    }
    return (
        <div className='login'>
            <div className="login_container">
                <img src={Image} alt="logo" />
                <div className="login_text">
                    <h1>Sign in to SuperChat</h1>
                </div>
                <Button target="_self" onClick={handleClick} type="submit">Sign In With Google</Button>
           </div>
        </div>
    )
}

export default Login
