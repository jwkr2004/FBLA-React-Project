//import '../css/Reports.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function Reports() {
    const [data, setData] = useState();
    useEffect(() => {
        axios
        // Getting all Student in Database
            .get('http://localhost:3001/getreports')
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
        let seconds = date.getSeconds();
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
        return daysofweek[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + ", " + hour + ":" + minutes + ":" + seconds + " "+ moa;
    }
    // function getStudents() {
    //     if (search && data) {
    //         // Displays sorted and searched events
    //         const Sort = filter.toLowerCase();
    //         return (
    //             <>
    //                 {data.map((users, index) => (
    //                     (filter === "Grade") ? (
    //                         (String(users[Sort]).includes(search)) ? (
    //                             <div className='Boxs' key={index}>
    //                                 <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
    //                                 <p className='BoxText'>Username: {users.username}</p>
    //                                 <p className='BoxText'>Points: {users.points}</p>
    //                                 <p className='BoxText'>Grade Level: {users.grade}</p>
    //                             </div>
    //                         ) : (<></>)
    //                     ) : (
    //                             (users[Sort.replace(/\s+/g, '')].toLowerCase().includes(search.toLowerCase())) ? (
    //                             <div className='Boxs' key={index}>
    //                                 <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
    //                                 <p className='BoxText'>Username: {users.username}</p>
    //                                 <p className='BoxText'>Points: {users.points}</p>
    //                                 <p className='BoxText'>Grade Level: {users.grade}</p>
    //                             </div>
    //                         ) : (<></>)
    //                     )
    //                 ))}
    //             </>
    //         )
    //     }
    //     else if (!search && data) {
    //         return (
    //             <>
    //                 {data.map((users, index) => (
    //                     <div className='Boxs' key={index}>
    //                         <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
    //                         <p className='BoxText'>Username: {users.username}</p>
    //                         <p className='BoxText'>Points: {users.points}</p>
    //                         <p className='BoxText'>Grade Level: {users.grade}</p>
    //                     </div>
    //                 ))}
    //             </>
    //         )
    //     }
    //     else{
    //         return(<div className="Boxs"><h1>No Results</h1></div>)
    //     }
    // }
    //return (
    //     <div className='Admin'>
    //         <form>
    //             {/* Search Bar and DropDown Menu Filter */}
    //             <input required className='Search' placeholder={`Enter Student By ${filter} Here`} onChange={(e) => setSearch(e.target.value)}></input>
    //             <select className='Filter' id="filter" onChange={(e) => setFilter(e.target.value)}>
    //                 <option value={"First Name"}>First Name</option>
    //                 <option value={"Last Name"}>Last Name</option>
    //                 <option value={"Grade"}>Grade</option>
    //             </select>
    //         </form>
    //         <br></br>
    //         {/* Buttons to Create New Account, Report and Generate a Report */}
    //         <div className='ButtonsA'>
    //             <a href='/newaccount' className='AdminB'>Add New Account +</a>
    //             <a href="/AdminStudents" onClick={() => CreateReport()} className='AdminB'>Create Report <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></a>
    //             <a href="/AdminStudents" onClick={() => GenerateWinners()} className='AdminB'>Generate Winners</a>
    //         </div>
    //         {getStudents()}
    //     </div>
    // );
    if(data !== undefined) {
        if(data.length > 0) {
            console.log(data);
            return (
                <div className="Admin">
                    <h1 className="Center">Reports</h1>
                    {data.map((report, index) => (
                        <div className='Boxs' key={report._id} onClick={() => window.open(`/viewreport?rid=${report._id}`, "_self")}>
                            <p className='BoxText'>Report Title: {report.title}</p>
                            <p className='BoxText'>Report Id: {report._id}</p>
                            <p className='BoxText'>Report Generated on: {getEventsTime(report.time)}</p>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            return(
                <div className="return">
                    <h2>No Reports Available</h2>
                    <a className="button" href="/AdminHome">Return to Home</a>
                </div>
            )
        }
    }
    else {
        return(<></>)
    }
}
export default Reports;