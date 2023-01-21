import '../css/login.css';
import axios from "axios";
import React, { useState } from 'react';

//Login Page
const Login = () => {
  const [bool, setBool] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  //Confirms Username and Password
  function SubmitForm(e) {
    e.preventDefault();
    axios
    .post('http://localhost:3001/login', {username, password})
    .then((res) => {
      console.log(res.data);
      if (res.data.message) {
        document.getElementById("message").innerText = res.data.message;
      }
      if (res.data.user) {
        console.log(res.data.message)
        if (res.data.user.isAdmin) {
          window.open('http://localhost:3000/AdminHome', '_self');
        }
        else {
          window.open('http://localhost:3000/StudentHome', '_self');
        }
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("message").innerText = err.message;
    });
  }

  const showPassword = () => {
    if(bool === false) {
      document.getElementById("showPassword").textContent = "Hide";
      document.getElementById("password").type = "text";
      setBool(true);
    }
    else if(bool === true) {
      document.getElementById("showPassword").textContent = "Show";
      document.getElementById("password").type = "password";
      setBool(false);
    }
  }
  return (
    <>
      <h1 className="header">Login</h1>
      <form id="loginForm" className="Form" onSubmit={e => SubmitForm(e)}>
        <div className="FormDiv">
          <label>Username:</label>
          <input id="username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className="FormDiv">
          <label>Password:</label>
          <div className="passwordDiv">
            <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
            <button className="Button" id="showPassword" type="button" onClick={() => showPassword()}>Show</button>
          </div>
        </div>
        <button className="FormSubmit Button" id="loginButton" type="submit">Login</button>
      </form>
      <div id="message"></div>
    </>
  )
}
export default Login;