


// style
import { useState } from 'react'
import './Signup.css';
import UseSignup from '../../hooks/UseSignup';
import { useNavigate } from 'react-router';

export default function Signup() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, waiting, signup, signupSuccess} = UseSignup();
    const [timer, setTimer] = useState(5)
    // navigation
    const nav = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        signup(email, password, displayName)
    }
    function navigationAfterSuccess(){
        setInterval(() => {
            setTimer(timer - 1);
        },1000)
        if(timer === 0){
            nav('/');
        }
    }
    if(signupSuccess){
        navigationAfterSuccess();
    }
    return (
        <div className="signup-container">
            {signupSuccess && <h1>SignUp Completed, You will be redirected to Home page in {timer} seconds</h1>}
            {!signupSuccess && <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <h3>{error}</h3>}
                <div className="input-container">
                    <label >
                        <span>Display Name : </span>
                        <input type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName}  required/>
                    </label>
                    <label >
                        <span>Email : </span>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    </label>
                    <label>
                        <span>Password : </span>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                    </label>
                </div>
                {!waiting && <button type="submit">Submit</button>}
                {waiting && <button type="submit" disabled>Pending ...</button>}

            </form>}
            
        </div>
    )
}
