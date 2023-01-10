import '../css/login.css';
import axios from "axios";
import React, { useState } from 'react';

const NewAccount = () => {
    const [bool, setBool] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    function SubmitForm(e) {
        e.preventDefault();
        const isAdmin = document.getElementById("isAdmin").options[document.getElementById("isAdmin").selectedIndex].value;
        const grade = document.getElementById("grade").options[document.getElementById("grade").selectedIndex].value;
        axios
          .post('http://localhost:3001/newaccount', {username, password, isAdmin, firstname, lastname, grade, points: 0})
          .then((res) => {
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
        <h1 className="header">New Account</h1>
        <form id="signupForm" className="Form" onSubmit={e => SubmitForm(e)}>
            <div className="FormDiv">
              <label>First Name:</label>
              <input id="firstname" name="firstname" onChange={(e) => setFirstname(e.target.value)} required/>
            </div>
            <div className="FormDiv">
              <label>Last Name:</label>
              <input id="lastname" name="lastname" onChange={(e) => setLastname(e.target.value)} required/>
            </div>
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
            <div className="FormDiv">
              <label>Admin Account:</label>
              <select id="isAdmin" name="isAdmin">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="FormDiv">
              <label>Grade:</label>
              <select id="grade" name="grade">
                <option value="0">N/A</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            
            <button className="FormSubmit Button" type="submit">Create</button>
        </form>
        <div id="message"></div>
      </>
    )
}

export default NewAccount;