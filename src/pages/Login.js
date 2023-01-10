//import '../css/login.css';
import axios, { Axios } from "axios";
import React, { useState } from 'react';

const Login = () => {
    const [bool, setBool] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    axios.defaults.withCredentials = true;
    function SubmitForm(e) {
        e.preventDefault();
        axios
          .post('http://localhost:3001/login', {username, password})
          .then((res) => {
            console.log(res.data);
            if(res.data.message) {
              document.getElementById("message").innerText = res.data.message;
            }
          })
          .catch(err => {
            console.error(err);
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