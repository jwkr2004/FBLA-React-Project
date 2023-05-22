//import '../css/Reports.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function Reports() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
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

    if(data !== undefined) {
        if(data.length > 0) {
            return (
                <div className="Admin">
                    <h1 className="Center">Reports</h1>
                    <br></br>
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