import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminEvents() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    useEffect(() => {
        //Sends a Get request to the backend Express server to obtain all of the events
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
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
    function getEvents() {
        //Displays any events that match the searched term if there is a searched term
        if(search && data) {
            return(
                <>
                    {data.map((events, index) => (
                        (events.EName.toLowerCase().includes(search.toLowerCase())) ? (
                            <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                                <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                <p className='BoxText'>Event Name: {events.EName}</p>
                                <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                                <p className='BoxText'>Point Amount: {events.Points}</p>
                                <p className='BoxText'>Event Bio: {events.EBio}</p>
                            </div>
                        ) : (<></>)
                    ))}
                </>
            ) 
        }
        //Displays all events if there are no searched terms
        else if(data){
            return(
                <>
                    {data.map((events, index) => (
                        <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                            <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                            <p className='BoxText'>Event Name: {events.EName}</p>
                            <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                            <p className='BoxText'>Point Amount: {events.Points}</p>
                            <p className='BoxText'>Event Description: {events.EBio}</p>
                        </div>
                    ))}
                </>
            )
            
        }
    }
    return (
        <div className='Admin'>
            {/* Search Bar */}
            <form>
                <input required className='Search2' placeholder='Search by Event Name' onChange={(e) => setSearch(e.target.value)} />
            </form>
            <br></br>
            {/* Add New Event Button */}
            <div className='ButtonsA'>
                <a href='/AddEvent' className='AdminB'>Add New Event +</a>
            </div>
            {getEvents()}
        </div>
    );
};
export default AdminEvents;