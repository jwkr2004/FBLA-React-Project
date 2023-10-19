// import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminEvents() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState("Event Name");
    const [sortType, setSortType] = useState("Ascending");
    const [sortBy, setSortBy] = useState("Event Name");
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

    function sortData(lData) {
        // console.log(sortType, sortBy);
        if(sortType !== undefined && sortBy !== undefined) {
            if(sortType === "Ascending") {
                if(sortBy === "Point Amount") {
                    lData.sort((a, b) => {
                        return a.Points - b.Points;
                    });
                }
                else if(sortBy === "Event Name") {
                    lData.sort((a, b) => {
                        let fa = a.EName.toLowerCase(),
                            fb = b.EName.toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
            }
            else if(sortType === "Descending") {
                if(sortBy === "Point Amount") {
                    lData.sort((a, b) => {
                        return b.Points - a.Points;
                    });
                }
                else if(sortBy === "Event Name") {
                    lData.sort((a, b) => {
                        let fa = a.EName.toLowerCase(),
                            fb = b.EName.toLowerCase();
                    
                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    });
                }
            }
            return lData;
        }
    }

    function getEvents() {
        // console.log(data);
        var lData;
        if(data !== undefined) {
            lData = sortData(data);
        }
        else {
            lData = data;
        }
        
        if (search !== undefined && lData !== undefined) {
            // Displays sorted and searched events

            // console.log(Sort);
            // console.log(lData);
            return (
                <>
                    {lData.map((events, index) => (
                        (filter === "Point Amount") ? (
                            (String(events["Points"]).includes(search)) ? (
                                <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                                    <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                    <div>
                                        <p className='BoxText'>Event Name: {events.EName}</p>
                                        <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                                        <p className='BoxText'>Point Amount: {events.Points}</p>
                                        <p className='BoxText'>Event Description: {events.EBio}</p>
                                    </div>
                                </div>
                            ) : (<></>)
                        ) : (
                            (events["EName".replace(/\s+/g, '')].toLowerCase().includes(search.toLowerCase())) ? (
                                <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                                    <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                                    <div>
                                        <p className='BoxText'>Event Name: {events.EName}</p>
                                        <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                                        <p className='BoxText'>Point Amount: {events.Points}</p>
                                        <p className='BoxText'>Event Description: {events.EBio}</p>
                                    </div>
                                </div>
                            ) : (<></>)
                        )
                    ))}
                </>
            )
        }
        else if (!search && lData) {
            return (
                <>
                    {lData.map((events, index) => (
                        <div className='Boxs' key={index} onClick={() => window.open(`/EditEvent?eid=${events._id}`, "_self")}>
                            <img src={events.Image} alt='EventImg' width='100px' height='100px'></img>
                            <div>
                                <p className='BoxText'>Event Name: {events.EName}</p>
                                <p className='BoxText'>Time of Event: {getEventsTime(events.DateandTime)}</p>
                                <p className='BoxText'>Point Amount: {events.Points}</p>
                                <p className='BoxText'>Event Description: {events.EBio}</p>
                            </div>
                        </div>
                    ))}
                </>
            )
        }
        else{
            return(<div id="message">No Results</div>)
        }
    }
    return (
        <div className='Admin Margin'>
            {/* Search Bar */}
            <h1 className="PageTitle">West-MEC Event Tracker</h1>
            <h2 className="PageTitle">Events</h2>
            <form className="SearchForm">
                {/* Search Bar and DropDown Menu Filter */}
                <input required className='Search' placeholder={`Search By ${filter}`} onChange={(e) => setSearch(e.target.value)}></input>
                <select className='Filter' id="filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value={"Event Name"}>Event Name</option>
                    <option value={"Point Amount"}>Point Amount</option>
                </select>
            </form>
            <br></br>
            {/* Add New Event Button */}
            <div className='ButtonsA'>
                <a href='/AddEvent' className='AdminB'>Add New Event +</a>
                <select className="AdminB" onChange={(e) => setSortBy(e.target.value)}>
                    <option value={"Event Name"}>Sort By Event Name</option>
                    <option value={"Point Amount"}>Sort By Point Amount   </option>
                </select>
                <select className="AdminB" onChange={(e) => setSortType(e.target.value)}>
                    <option value={"Ascending"}>Ascending</option>
                    <option value={"Descending"}>Descending</option>
                </select>
            </div>
            {getEvents()}
        </div>
    );
};
export default AdminEvents;