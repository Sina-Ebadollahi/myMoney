


// style
import { useState } from 'react';
import './Login.css'
// hooks
import UseLogin from '../../hooks/UseLogin';
import { useNavigate } from 'react-router';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, waiting, login } = UseLogin();
    const nav = useNavigate();
    function handleSubmit(e){ 
        e.preventDefault();
        login(email,password)
        if(!error){
            nav('/')
        }
    }
    return (
        <div className="loginContainer">
            <form className="signup-form" onSubmit={e => handleSubmit(e)}>
                <div className='headerContainer'>
                    <h1>Login</h1>
                </div>
                <div className="auth-container">
                    <label className="label1">
                        <span>Email : </span>
                        <input type="email" onChange={e => setEmail(e.target.value)} value={email} required/>
                    </label>
                    <label className="label2">
                        <span>Pass : </span>
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} required/>
                    </label>
                </div>
                <button type="submit" className="login-submit">Submit</button>
                {error && <h1>{error}</h1>}
                
            </form>
            
        </div>
    )
}
