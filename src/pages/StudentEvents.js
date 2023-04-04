import '../css/StudentEvents.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function StudentEvents() {
    const [data, setData] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        // Gets the User Info
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch(err => {
                console.error(err);
            });
        // Gets all Events
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    // Updates Points for User and Updates it in Database
    function joinEvent(event) {
        if(user) {
            axios
            .post('http://localhost:3001/updatepoints', {user, event})
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    console.log(res.data.message);
                    document.getElementById("message").innerText = res.data.message;
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
    //Displays all events
    function getEvents() {
        if (data) {
            return (
                <>
                    {data.map((events, index) => (
                        <div className='BoxSE3' id='BoxSE33' key={index}>
                            <img src={events.Image} alt={events.EName} width='250px' height='160px' className='StudentEventIMG' />
                            <p className='pushinpp'><b>{events.EName}</b>: {events.EBio} <br></br><br></br>This will reward you <b>{events.Points}</b> points!</p>
                            <br></br>
                            <button type="button" className='button289' onClick={() => joinEvent(events)}>Join Event!</button>
                        </div>
                    ))}
                </>
            )  
        }
    }
    return (
        <div id="StudentEvents">
            <h1 className='Headingg'>Events</h1>
            {/* Message to tell the user if they've joined an event or not  */}
            <div id="message"></div>
            {getEvents()}
        </div>    
    );
}
export default StudentEvents;