import '../css/StudentEvents.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function StudentEvents() {
    const [data, setData] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function joinEvent() {
        console.log('Test');
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
                            <button type="button" className='button289' onClick={()=> joinEvent()}>Join Event!</button>
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