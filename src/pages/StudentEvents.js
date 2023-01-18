import '../css/StudentEvents.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function StudentEvents() {
    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const [user, setUser] = useState();
    const [points, setPoints] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                //console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch(err => {
                console.error(err);
            });
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
        axios
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function joinEvent(event) {
        if(user) {
            axios
            .post('http://localhost:3001/updatepoints', {user, event})
            .then((res) => {
                console.log(res.data);
                let Message = res.data.message;
                console.log(Message);
                if (res.data.message) {
                    document.getElementById("message").innerText = Message;
                }
                if (Message === "Account Created") {
                    window.location.replace('http://localhost:3000');
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
    function getEvents() {
        if (data) {
            return (
                <>
                    {data.map((events, index) => (
                        <div className='BoxSE3' id='BoxSE33'>
                            <img src={events.Image} alt='Students' width='250px' height='160px' className='StudentEventIMG' />
                            <p className='pushinpp'><b>{events.EName}</b>: {events.EBio} <br></br>This will rewarded you <b>{events.Points}</b> points!</p>
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
            {getEvents()}
        </div>    
    );
}
export default StudentEvents;