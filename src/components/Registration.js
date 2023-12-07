import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem('usersDB')) || [];
  const [userInfo, setUserInfo] = useState(localData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submit function
  const handleSubmit = (e) => {
    e.preventDefault()

    let newUser = {
      name,
      email,
      password
    };
    setUserInfo([...userInfo, newUser]);
    setName('');
    setEmail('');
    setPassword('');

    localStorage.setItem('usersDB', JSON.stringify([...userInfo, newUser]));

    navigate('/login')
  };

  // Saving to local storage
  useEffect(() => {
    localStorage.setItem("usersDB", JSON.stringify(userInfo));
  }, [userInfo]);

  const routeToLogin = () => {
    navigate('/login')
  };

  return (
    <div className="register">
      <div className="col-1">
        <h2> Sign Up </h2>
        <span> Register your details below: </span>
        <form id="form" className='form-register flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="InputName"> Name </label>
          <input
            name="name"
            value={name}
            type="text"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="InputEmail"> Email </label>
          <input
            name="email"
            value={email}
            type="email"
            placeholder="email@mail.com"
            required
            onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="InputEmail"> Password </label>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)} />

          <button className='btn'> Sign Up </button>
        </form>
        <span>
          Already registered ?
          <span className='btn-sign-in' value="Go to Login" onClick={() => routeToLogin()}>
            Sign In
          </span>
        </span>
      </div>
    </div>
  )
}

export default Registration;
