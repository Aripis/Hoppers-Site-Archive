import { useState } from 'react';
import { get } from 'lodash/object'
import Textfield from '../components/textfield'
import Button from '../components/button'
import Navbar from '../components/navbar'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'

initFirebase()

const Signin = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingSignIn, setLoadingSignIn] = useState(false)

    const handleSignIn = e => {
        e.preventDefault()
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        firebase.auth().signInWithEmailAndPassword(email, password)
    }

    return (
        <>
            <style jsx>{`
                .wrp-signin {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: url("https://miro.medium.com/max/11416/0*Mjaw2WtpiOUiz2dy");
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;  
                }

                .wrp-signin > .signin-form {
                    padding: 4em 6em 5em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    background-image: linear-gradient(to top, #d2d2d2, #e5e5e5);
                    border-radius: .3em;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                }

                .wrp-signin > .signin-form > .form-field {
                    width: 25em;
                }

                .wrp-signin > .signin-form > .form-field,
                .wrp-signin > .signin-form > .form-actions {
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 1.4em;
                }

                .wrp-signin > .signin-form > .form-actions > :global(.form-submit) {
                    font-size: 1.1em;
                }

                .wrp-signin > .signin-form > .form-header {
                    align-self: center;
                    font-size: 2em;
                }

                .wrp-signin > .signin-form > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .wrp-signin > .signin-form > .form-field > .form-div:nth-child(even):not(:only-child) {
                    margin-left: .3em;
                }
                
                .wrp-signin > .signin-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                    margin-right: .3em;
                }

                .wrp-signin > .signin-form > .form-field > .form-div > :global(.form-input) {
                    font-size: 1em;
                }

                .form-div > label {
                    color: grey;
                    position: absolute;
                    margin: .81em 1.05em 0;
                    font-size: 1em;
                    user-select: none;
                    transform: translateZ(0);
                    transition: .2s;
                    pointer-events: none;
                }

                .form-div .required:after{
                    content: '*';
                    color: red;
                    margin-left: .25em;
                }

                :global(.form-input:not([value=""])) + label{
                    margin: -1.5em 0 0 .3em;
                    color: black;
                    font-size: .75em;
                }

                :global(.form-input):focus + label {
                    margin: -1.5em 0 0 .3em;
                    color: #0089fa;
                    font-size: .75em;
                }

                @media only screen and (max-width: 985px){
                    .wrp-signin > .signin-form > .form-field {
                        flex-direction: column;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(even):not(:only-child),
                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                        margin: 0;
                    }

                    .wrp-signin > .signin-form > .form-field {
                        width: 100%;
                        margin-top: 0;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div > :global(.form-input) {
                        margin-top: 1.4em;
                    }

                    .wrp-signin > .signin-form > .form-field > :global(.form-submit) {
                        margin-top: 1em;
                    }

                    .form-div > label {
                        margin: 2.2em 1.05em 0;
                        font-size: 1em;
                    }

                    :global(.form-input:not([value=""])) + label{
                        margin: .2em 0 0 0;
                    }

                    :global(.form-input):focus + label {
                        margin: .2em 0 0 0;
                    }
                }

                @media only screen and (max-width: 545px){
                    .wrp-signin > .signin-form {
                        padding: 4em 2em 5em;
                        align-items: center;
                    }

                    .wrp-signin > .signin-form > .form-header {
                        // font-size: 1.5em;
                    }
                }
            `}</style>
            <Navbar {...props}/>
            <div className="wrp-signin">
                <form onSubmit={handleSignIn} className="signin-form">
                    <h2 className="form-header">Sign into your account</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-input" />
                            <label>Email</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-input" />
                            <label>Password</label>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button loading={loadingSignIn} onClick={() => setLoadingSignIn(!loadingSignIn)} type="submit" value="Sign in" className="form-submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

Signin.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if(AuthUser !== null){
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
}

export default withAuthUser(withAuthUserInfo(Signin))