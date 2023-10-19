import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminVerification() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getrequests')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function getRequestTime(time) {
        const daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date(time);
        let hour = date.getHours();
        let moa = "AM";
        if(hour > 12) {
            hour -= 12;
            moa = "PM";
        }
        if(hour === 0) {
            hour = 12;
        }
        let minutes = date.getMinutes();
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        return daysofweek[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ", " + hour + ":" + minutes + " " + moa;
    }
    function Confirm(request) {
        console.log(request);
        if (data) {
            axios
                .post('http://localhost:3001/addPoints', { request })
                .then((res) => {
                    let Message = res.data.message;
                    console.log(Message);
                    if (res.data.message) {
                        document.getElementById("message").innerText = Message;
                    }
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
    function Decline(request) {
        console.log(data);
        if (data) {
            axios
                .post('http://localhost:3001/declineRequest', { request })
                .then((res) => {
                    let Message = res.data.message;
                    console.log(Message);
                    if (res.data.message) {
                        document.getElementById("message").innerText = Message;
                    }
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
    function getRequests() {
        if (data !== undefined) {
            if(search && data.length > 0) {
                return(
                    <>
                        {data.map((request, index) => (
                            (request.Student.toLowerCase().includes(search.toLowerCase())) ? (
                                <div className='requests' key={index}>
                                    <p>{request.Student} requested to join {request.Event} for {request.Points} points.</p>
                                    <p className="requestdate">{getRequestTime(request.Date)}</p>
                                    <button className='AdminR button' onClick={() => Confirm(request)}>Confirm</button>
                                    <button className='AdminR button' onClick={() => Decline(request)}>Decline</button>
                                </div>
                                // <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                                //     <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                //     <div>
                                //         <p className='BoxText'>Event Name: {events.EName}</p>
                                //         <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                                //         <p className='BoxText'>Point Amount: {events.Points}</p>
                                //         <p className='BoxText'>Event Description: {events.EBio}</p>
                                //     </div>
                                // </div>
                            ) : (<></>)
                        ))}
                    </>
                ) 
            }
            else if(data.length > 0) {
                return (
                    <>
                        {data.map((request, index) => (
                            <div className='requests' key={index}>
                                <p>{request.Student} requested to join {request.Event} for {request.Points} points.</p>
                                <p className="requestdate">{getRequestTime(request.Date)}</p>
                                <button className='AdminR button' onClick={() => Confirm(request)}>Confirm</button>
                                <button className='AdminR button' onClick={() => Decline(request)}>Decline</button>
                            </div>
                        ))}
                    </>
                )
            }
            else {
                return(
                    <div className="return">
                        <h2>No Requests Available</h2>
                        <a className="button" href="/AdminHome">Return to Home</a>
                    </div>
                )
            }
        }
    }
    return (
        <div id="AdminVerification" className="Margin">
            <h1 className="PageTitle">West-MEC Event Tracker</h1>
            <h2 className="PageTitle">Verification</h2>
            <form className="SearchForm">
                <input required className='Search2' placeholder='Search by Username' onChange={(e) => setSearch(e.target.value)} />
            </form>
            <div className="RequestDiv">
                {getRequests()}
            </div>
            <div id="message"></div>
        </div>
    );
};
export default AdminVerification;