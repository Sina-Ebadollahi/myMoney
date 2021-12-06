


// style
import styles from './Navbar.module.css'

// routing
import { Link } from 'react-router-dom'
// Authencicated
import UseAuth from '../../hooks/UseAuth'
// hooks
import UseLogout from '../../hooks/UseLogout';
export default function Navbar() {
    const {user, dispatch} = UseAuth();
    const { logOut } = UseLogout()


    function isLoggedIn(){
        if(user != null){
            return true;
        }
    }
    function logginOut(){
        dispatch({type: 'LOGOUT', payload: null})
        logOut();
    }
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>ShoppingTracker</li>
                <li>
                    {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">signup</Link>
                    </>
                    )}
                    {user && <h1>hello, {user}</h1>}
                </li>
                {isLoggedIn() && <li>
                    <button onClick={() => logginOut()}>
                        Logout
                    </button>
                </li>}
            </ul>
            
        </nav>
    )
}
