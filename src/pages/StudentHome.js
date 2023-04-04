import '../css/StudentHome.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function StudentHome() {
    const [data, setData] = useState();
    useEffect(() => {
        // Gets All Events
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function NewEvents() {
        // Gets the three newest events and displays them
        if (data) {
            var arr = [];
            var int = data.length - 1;
            var i;
            if(data.length < 3) {
                i = data.length;
            }
            else {
                i = 3;
            }
            for (; i > 0; i--) {
                arr.push(
                    <div className='Box2' key={"index" + i}>
                        <p><b>{data[int].EName}</b><br></br>This will reward you {data[int].Points}!</p>
                        <img src={data[int].Image} alt={data[int].EName} width='100%' height='70%' className='HomeImg' />
                        <br></br>
                        <a className='button2' href='/StudentEvents'>View Events</a>
                    </div>
                )
                int--;
            }
            return(arr)
        }
        else {
            return(
                <div className="Box2">
                    <div id="message">No Events Currently Available</div>
                </div>
            )
        }
    }
    return (
        <div id="StudentHome">
            <h2 id='SHead'>Welcome, Student</h2>
            {NewEvents()}
        </div>
    );
}
export default StudentHome;