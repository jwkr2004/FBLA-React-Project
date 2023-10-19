// import '../css/StudentEvents.css';
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
                    let element = document.getElementsByTagName("nav")[0];
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
    function getEventsTime(time) {
        const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date(time);
        let hour = date.getHours();
        let moa = "AM";
        if(hour > 12) {
            hour -= 12;
            moa = "PM";
        }
        let minutes = date.getMinutes();
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        return daysofweek[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ", " + hour + ":" + minutes + " " + moa;
    }
    //Displays all events
    function getEvents() {
        if (data) {
            return (
                <>
                    {data.map((events, index) => (
                        <div className='BoxsH' key={index}>
                            <div>
                                <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                <div>
                                    <p className='BoxText EventName'>{events.EName}</p>
                                    <p className='BoxText'>Time: {getEventsTime(events.DateandTime)}</p>
                                    <p className='BoxText'>{events.Points} Points</p>
                                    <p className='BoxText'>{events.EBio}</p>
                                </div>
                            </div>
                            <button type="button" className='button289' onClick={() => joinEvent(events)}>Join Event!</button>
                        </div>
                        // <div className='BoxSE3' id='BoxSE33' key={index}>
                        //     <img src={events.Image} alt={events.EName} width='250px' height='160px' className='StudentEventIMG' />
                        //     <p className='pushinpp'><b>{events.EName}</b>: {events.EBio} <br></br><br></br>This will reward you <b>{events.Points}</b> points!</p>
                        //     <br></br>
                        //     <button type="button" className='button289' onClick={() => joinEvent(events)}>Join Event!</button>
                        // </div>
                    ))}
                </>
            )  
        }
    }
    return (
        <div id="StudentEvents" className="Margin">
            <h1 className="PageTitle">West-MEC Event Tracker</h1>
            <h2 className="PageTitle">Events</h2>
            {/* Message to tell the user if they've joined an event or not  */}
            <div id="message"></div>
            {getEvents()}
        </div>    
    );
}
export default StudentEvents;