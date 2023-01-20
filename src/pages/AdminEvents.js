import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminEvents() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    useEffect(() => {
        //Getting Events from Database
        axios
            .get('http://localhost:3001/getevents')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function getEvents() {
        // Displaying Searched and All Events from Database 
        if(search && data) {
            return(
                <>
                    {data.map((events, index) => (
                        (events.EName.toLowerCase().includes(search.toLowerCase())) ? (
                            <div className='Boxs'>
                                <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                <p className='BoxText'>Event Name: {events.EName}</p>
                                <p className='BoxText'>Point Amount: {events.Points}</p>
                                <p className='BoxText'>Event Bio: {events.EBio}</p>
                            </div>
                        ) : (<></>)
                    ))}
                </>
            ) 
        }
        else if(data){
            return(
                <>
                    {data.map((event, index) => (
                        <div className='Boxs'>
                            <img src={event.Image} alt='EventImg' width='100px' height='100px'></img>
                            <p className='BoxText'>Event Name: {event.EName}</p>
                            {console.log(new Date(event.Date))}
                            <p className='BoxText'>Time of Event: {event.Date}</p>
                            <p className='BoxText'>Point Amount: {event.Points}</p>
                            <p className='BoxText'>Event Description: {event.EBio}</p>
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
                <input required className='Search2' placeholder='Enter Event Name Here' onChange={(e) => setSearch(e.target.value)} />
            </form>
            <br></br>
            {/* Add New Event Button */}
            <div className='ButtonsA'>
                <a href='/AddEvent' className='AdminB'>Add New Event +</a>
            </div>
            {getEvents()}
        </div>
    );
}
export default AdminEvents;