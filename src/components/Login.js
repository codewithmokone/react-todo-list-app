import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'


// Getting data from local storage
const localUserData = () => {

    const data = localStorage.getItem('usersDB');

    if(data) {
        return JSON.parse(data)
    }else {
        return []
    };
    
}

const Login = ({ setUserState }) => {
    // console.log(setUserState)
    const navigate = useNavigate()
    const location = useLocation()
    const routeToRegister = () => {
        navigate('/register')
    }

    const routeToHome = () => {
        navigate('../')
    }

    const [users, setUsers] = useState(localUserData()) 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        // Retrieve users data from local storage
        const storedUsers = localStorage.getItem('usersDB');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      }, []);

    // Submit function
    const handleSubmit = (e) => {
        e.preventDefault()

        const users = JSON.parse(localStorage.getItem("usersDB")) || [];

        let user = users.find(user => username === user.email && password === user.password)

        if(user){
            console.log('login succefull')
            setUserState(true)
            routeToHome();
        } else {
            console.log('Invalid email or password')
        }

        setUsername('');
        setPassword('');
    }
  

    return (
        <div className="login-container">
        <div className="col-1">
                <h2> Sign In </h2>
                <span>Please login to access the Todo App</span>
                <form id="form" className='form-login flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="InputEmail"> Username </label>
                    <input 
                    name="email"
                    type="email" 
                    placeholder="username" 
                    value={username}
                    onChange={handleUsernameChange}
                    />

                    <label htmlFor="InputPassword"> Password </label>
                    <input 
                    name="password"
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    />   

                    <button className='btn'> Sign In </button>  
                </form>
                <span>Don't have an account? <span className='btn-sign-up' value="Go to Register" onClick={() => routeToRegister()}> Sign Up </span></span>
            </div>
        </div>
    )
}

export default Login
