// import '../css/login.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
const EditAccount = () => {
  //Global Variables
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [points, setPoints] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);
  const uid = queryParameters.get("uid");

  useEffect(() => {
  axios
      .post("http://localhost:3001/getuserbyid", {uid})
      .then((res) => {
        let Message = res.data.message;
        if (Message === "User Not Found") {
          window.location.replace('http://localhost:3000/AdminStudents');
        }
        let user = res.data.user[0];
        if (user !== undefined) {
          setUsername(user.username);
          setFirstname(user.firstname);
          setLastname(user.lastname);
          setPoints(user.points);
          switch(user.grade) {
            case 0:
              document.getElementById("grade").options[0].setAttribute("selected", "");
            break;
            case 9:
              document.getElementById("grade").options[1].setAttribute("selected", "");
            break;
            case 10:
              document.getElementById("grade").options[2].setAttribute("selected", "");
            break;
            case 11:
              document.getElementById("grade").options[3].setAttribute("selected", "");
            break;
            case 12:
              document.getElementById("grade").options[4].setAttribute("selected", "");
            break;
            default:
              document.getElementById("grade").options[0].setAttribute("selected", "");
            break;
          }

          if(user.isAdmin === false) {
            document.getElementById("isAdmin").options[0].setAttribute("selected", "");
          }
          else {
            document.getElementById("isAdmin").options[1].setAttribute("selected", "");
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [uid]);

  function accountDelete() {
    var conf = window.confirm("Are you sure that you want to delete this account?");
    if(conf) {
      axios
      .post('http://localhost:3001/deleteaccount', { uid })
      .then((res) => {
        let Message = res.data.message;
        console.log(Message);
        if (res.data.message) {
          document.getElementById("message").innerText = Message;
        }
        if (Message === "Account Deleted") {
          window.location.replace('http://localhost:3000/AdminStudents');
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  }
  
  function SubmitForm(e) {
    //Sends the New Student Information to the Backend Server
      e.preventDefault();
      const isAdmin = document.getElementById("isAdmin").options[document.getElementById("isAdmin").selectedIndex].value;
      const grade = document.getElementById("grade").options[document.getElementById("grade").selectedIndex].value;
      axios
        .post("http://localhost:3001/editaccount", {username, isAdmin, firstname, lastname, grade, points, uid})
        .then((res) => {
          let Message = res.data.message;
          console.log(Message);
          if (res.data.message) {
            document.getElementById("message").innerText = Message;
          }
          if (Message === "Account Updated") {
            window.open("http://localhost:3000", "_self");
          }
        })
        .catch(err => {
          console.error(err);
        });
  }
  return (
    <div id='EditAccount'>
      <h1 className="header">Edit Account</h1>
      {/* The Form Where the Admin Puts the New Student Information */}
      <form id="signupForm" className="Form" onSubmit={e => SubmitForm(e)}>
          <div className="FormDiv">
            <label>First Name:</label>
            <input id="firstname" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
          </div>
          <div className="FormDiv">
            <label>Last Name:</label>
            <input id="lastname" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
          </div>
          <div className="FormDiv">
            <label>Username:</label>
            <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </div>
          <div className="FormDiv">
            <label>Points:</label>
            <input id="Points" name="Points" type="text" value={points} onChange={(e) => setPoints(e.target.value)} required />
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
          <div className="flexd">
            <button className="FormSubmit button SubmitButtons" type="submit">Update</button>
            <button className="FormSubmit button SubmitButtons" type="button" onClick={() => accountDelete()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="-2 -5 20 20"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg></button>
          </div>
      </form>
      <div id="message"></div>
    </div>
  )
}
export default EditAccount;