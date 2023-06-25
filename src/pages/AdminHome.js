/* eslint-disable */
// import '../css/AdminHome.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminHome() {
    const [user, setUser] = useState();
    const [events, setEvents] = useState();
    const [users, setUsers] = useState();
    const [backup, setBackup] = useState(false);
    useEffect(() => {
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setEvents(res.data);
            })
            .catch(err => {
                console.error(err);
            });
        axios
            .get('http://localhost:3001/getUsers')
            .then((res) => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error(err);
            });
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                setUser(res.data.user.firstname);
            })
            .catch(err => {
                console.error(err);
            });
        function Backup() {
            if (users) {
                const CurrentDate = new Date();
                const Hour = CurrentDate.getHours();
                const Minutes = CurrentDate.getMinutes();
                const Time = Number(Hour + "." + Minutes);
                const BackUpTime = 10.05; 
                const EmptySpace = ['   Events:    '];
                //console.log(BackUpTime, Time);
                if (Time === BackUpTime) {
                    if (backup === false) {
                        const blob = new Blob([JSON.stringify(users, null, 2), JSON.stringify(EmptySpace, null, 2), JSON.stringify(events, null, 2)], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.download = "EventTrackerDB " + CurrentDate + ".json";
                        link.href = url;
                        link.click();
                    }
                    setBackup(true);
                }
                else if (CurrentDate === 24) { 
                    setBackup(false);
                }
            }
        }
        Backup();
    }, []);
    if(user !== undefined) {
        return (
            <div id="AdminHome">
                <h1 className="PageTitle">West-MEC Event Tracker</h1>
                <h2 id="head">Welcome, {user}</h2>
                <div className="ButtonParent">
                    {/* View Students Button */}
                    {/* <div className='Box' id='box1'>
                        <img src="https://freesvg.org/img/Three-Children-Holding-Up-Arms.png" alt='Students' width='100%' height='300px' className='Images' />
                        <a className='button' href='/AdminStudents'>View Students</a>
                    </div> */}
                    <div className='Box imgBox' id='box1' onClick={() => window.open("/AdminStudents", "_self")}>
                        <img src={require("./Images/Students.png")} alt='Students' width='100%' className='Images' />
                        {/* <a className='button' href='/AdminStudents'>View Students</a> */}
                        <h3 className="ButtonText">View Students</h3>
                    </div>
                    {/* View Events Button */}
                    {/* <div className='Box' id='box2'>
                        <img src="https://freesvg.org/img/rollerCoaster2.png" alt='Events' width='100%' height='300px' className='Images' />
                        <a className='button' href='/AdminEvents'>View Events</a>
                    </div> */}
                    <div className='Box imgBox' id='box2' onClick={() => window.open("/AdminEvents", "_self")}>
                        <img src={require("./Images/Events.png")} alt='Events' width='100%' className='Images' />
                        {/* <a className='button' href='/AdminEvents'>View Events</a> */}
                        <h3 className="ButtonText">View Events</h3>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div id="AdminHome">
                <h1 className="PageTitle">West-MEC Event Tracker</h1>
                <h2 id="head">Welcome, Admin</h2>
                <div className="ButtonParent">
                    {/* View Students Button */}
                    {/* <div className='Box' id='box1'>
                        <img src="https://freesvg.org/img/Three-Children-Holding-Up-Arms.png" alt='Students' width='100%' height='300px' className='Images' />
                        <a className='button' href='/AdminStudents'>View Students</a>
                    </div> */}
                    <div className='Box imgBox' id='box1' onClick={() => window.open("/AdminStudents", "_self")}>
                        <img src={require("./Images/Students.png")} alt='Students' className='Images' />
                        {/* <a className='button' href='/AdminStudents'>View Students</a> */}
                        <h3 className="ButtonText">View Students</h3>
                    </div>
                    {/* View Events Button */}
                    {/* <div className='Box' id='box2'>
                        <img src="https://freesvg.org/img/rollerCoaster2.png" alt='Events' width='100%' height='300px' className='Images' />
                        <a className='button' href='/AdminEvents'>View Events</a>
                    </div> */}
                    <div className='Box imgBox' id='box2' onClick={() => window.open("/AdminEvents", "_self")}>
                        <img src={require("./Images/Events.png")} alt='Events' className='Images' />
                        {/* <a className='button' href='/AdminEvents'>View Events</a> */}
                        <h3 className="ButtonText">View Events</h3>
                    </div>
                </div>
            </div>
        );
    }
};
export default AdminHome;