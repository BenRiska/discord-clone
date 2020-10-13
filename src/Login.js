import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import {auth, provider} from "./firebase"

function Login() {
    const signIn = e => {
        auth.signInWithPopup(provider).catch(err => console.log(err));
    }
    return (
        <div className="login">
            
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png" alt="logo"/>
            </div>

            <Button onClick={e => signIn(e)}>Sign In</Button>
        </div>
    )
}

export default Login
