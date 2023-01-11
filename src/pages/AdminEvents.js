import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminEvents() {
    const [data, setData] = useState();
    const [result, setResult] = useState("");
    const [search, setSearch] = useState("");
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
    function SubmitForm(e) {
        e.preventDefault();
        console.log(search);
        axios
            .post('http://localhost:3001/eventSearch', { search })
            .then((res) => {
                console.log(search);
                setResult(res.result);
                // let Message = res.data.message;
                // console.log(Message);
                // if (res.data.message) {
                //     document.getElementById("message").innerText = Message;
                // }
                // if (Message === "Event Created") {
                //   window.location.replace('http://localhost:3000/AdminEvents');
                // }
            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
        <div className='Admin'>
            <form onSubmit={e => SubmitForm(e)}>
                <input required className='Search' placeholder='Enter Event Name Here' onChange={(e) => setSearch(e.target.value)}></input>
                <button type='submit' className='SearchB'>Search</button>
            </form>
            <br></br>
            <div className='ButtonsA'>
                <a href='/SortBy' className='AdminB'>SortBy:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="White" class="bi bi-arrow-down" viewBox="0 0 16 14"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" /></svg></a>
                <a href='/AddEvent' className='AdminB'>Add New Event+</a>
            </div>
            {(data === undefined ? (
            <></>
            ) : (
                <>
                    {data.map((event, index) => (
                        <div className='Boxs'>
                            <img src={event.Image} alt='EventImg' width='100px' height='100px'></img>
                            <p className='BoxText'>Event Name: {event.EName}</p>
                            <p className='BoxText'>Point Amount: {event.Points}</p>
                            <p className='BoxText'>Event Bio: {event.EBio}</p>
                        </div>
                    ))}
                </>
            ))}
        </div>
    );
}
export default AdminEvents;