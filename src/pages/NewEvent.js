import '../css/NewEvent.css';
import axios from "axios";
import React, { useState } from 'react';

const NewEvent = () => {
  const [Image, setImage] = useState("");
  const [EName, setEName] = useState("");
  const [EBio, setEBio] = useState("");
  const [Points, setPoints] = useState("");
  const [Time, setTime] = useState("");
  const [Date, setDate] = useState("");

  function SubmitForm(e) {
    e.preventDefault();
    //console.log(Image, EName, EBio, Points, Time, Date);
    axios
      .post('http://localhost:3001/newevent', { Image, EName, EBio, Points, Date: `${Date}T${Time}` })
      .then((res) => {
        let Message = res.data.message;
        console.log(Message);
        if (res.data.message) {
          document.getElementById("message").innerText = Message;
        }
        if (Message === "Event Created") {
          window.location.replace('http://localhost:3000/AdminEvents');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <div id='NewEvent'>
      <h1 className="header">New Event</h1>
      <form id="signupForm" className="Form" onSubmit={e => SubmitForm(e)}>
        <div className="FormDiv">
          <label>Image URL:</label>
          <input id="Image" name="Image" type="text" onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Event Name:</label>
          <input id="EName" name="EName" type="text" onChange={(e) => setEName(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Event Description:</label>
          <input id="EBio" name="EBio" type="text" onChange={(e) => setEBio(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Point Value:</label>
          <input id="Points" name="Points" type="text" onChange={(e) => setPoints(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Date of Event:</label>
          <input id="date" name="Date" type="date" onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Time of Event:</label>
          <input id="time" name="Time" type="time" onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button className="FormSubmit" type="submit">Create</button>
      </form>
      <div id="message"></div>
    </div>
  );
}

export default NewEvent;