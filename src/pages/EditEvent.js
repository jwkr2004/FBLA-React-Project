import '../css/NewEvent.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
const EditEvent = () => {
  //Global Variables
  const [Image, setImage] = useState("");
  const [EName, setEName] = useState("");
  const [EBio, setEBio] = useState("");
  const [Points, setPoints] = useState("");
  const [Time, setTime] = useState("");
  const [_Date, setDate] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);
  const eid = queryParameters.get("eid");

  useEffect(() => {
    axios
      .post("http://localhost:3001/geteventbyid", {eid})
      .then((res) => {
        let Message = res.data.message;

        if (Message === "Event Not Found") {
          // document.getElementById("message").innerText = Message;
          window.location.replace('http://localhost:3000/AdminEvents');
        }
        let event = res.data.event[0];
        //console.log(event);
        if (event !== undefined) {
          setImage(event.Image);
          setEName(event.EName);
          setEBio(event.EBio);
          setPoints(event.Points);
          const date = new Date(event.DateandTime);
          let h = date.getHours();
          if(h < 10) {
            h = "0" + h;
          }
          let m = date.getMinutes();
          if(m < 10) {
            m = "0" + m;
          }
          setTime(h + ":" + m);
          let y = date.getFullYear();
          let mo = date.getMonth() + 1;
          if(mo < 10) {
            mo = "0" + mo;
          }
          let d = date.getDate();
          if(d < 10) {
            d = "0" + d;
          }
          setDate(y + "-" + mo + "-" + d);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function SubmitForm(e) {
    e.preventDefault();
    //Sends all the data the user puts in and sends it to the backend
    axios
      .post('http://localhost:3001/editevent', { Image, EName, EBio, Points, DateandTime: `${_Date}T${Time}`, eid })
      .then((res) => {
        let Message = res.data.message;
        console.log(Message);
        if (res.data.message) {
          document.getElementById("message").innerText = Message;
        }
        if (Message === "Event Updated") {
          window.location.replace('http://localhost:3000/AdminEvents');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  function eventDelete() {
    var conf = window.confirm("Are you sure that you want to delete this event?");
    if(conf) {
      axios
      .post('http://localhost:3001/deleteevent', { eid })
      .then((res) => {
        let Message = res.data.message;
        console.log(Message);
        if (res.data.message) {
          document.getElementById("message").innerText = Message;
        }
        if (Message === "Event Deleted") {
          window.location.replace('http://localhost:3000/AdminEvents');
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  }
  return (
    <div id='NewEvent'>
      <h1 className="header">New Event</h1>
      {/* The Form the Admin puts the New Event information */}
      <form id="signupForm" className="Form" onSubmit={e => SubmitForm(e)}>
        <div className="FormDiv">
          <label>Image URL:</label>
          <input id="Image" name="Image" type="text" value={Image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Event Name:</label>
          <input id="EName" name="EName" type="text" value={EName} onChange={(e) => setEName(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Event Description:</label>
          <input id="EBio" name="EBio" type="text" value={EBio} onChange={(e) => setEBio(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Point Value:</label>
          <input id="Points" name="Points" type="text" value={Points} onChange={(e) => setPoints(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Date of Event:</label>
          <input id="date" name="Date" type="date" value={_Date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="FormDiv">
          <label>Time of Event:</label>
          <input id="time" name="Time" type="time" value={Time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div className="flexd">
          <button className="FormSubmit" type="submit">Update</button>
          <button className="FormSubmit" type="button" onClick={() => eventDelete()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="-2 -5 20 20"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg></button>
        </div>
      </form>
      <div id="message"></div>
    </div>
  );
}

export default EditEvent;