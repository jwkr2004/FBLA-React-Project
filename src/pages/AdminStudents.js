/* eslint-disable */
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminStudents() {
    const [data, setData] = useState();
    const [title, setTitle] = useState();
    const [search, setSearch] = useState();
    const [sortType, setSortType] = useState("Ascending");
    const [sortBy, setSortBy] = useState("First Name");
    const [reportNumber, setReportNumber] = useState(0);
    const [filter, setFilter] = useState("First Name");
    const [bool, setBool] = useState(true);
    useEffect(() => {
        axios
            // Getting all Student in Database
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setData(res.data);
                //console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if(reportNumber > 0 && data) {
            axios
            // Generates a Report
            .post('http://localhost:3001/generatereport', {data, title})
            .then((res) => {
                setTitle()
                //console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            });
        }
    }, [reportNumber]);

    function sortData(lData) {
        // console.log(sortType, sortBy);
        if(sortType !== undefined && sortBy !== undefined) {
            if(sortType === "Ascending") {
                if(sortBy === "Grade") {
                    lData.sort((a, b) => {
                        return a.grade - b.grade;
                    });
                }
                else if(sortBy === "Points") {
                    lData.sort((a, b) => {
                        return a.points - b.points;
                    });
                }
                else if(sortBy === "First Name") {
                    lData.sort((a, b) => {
                        let fa = a.firstname.toLowerCase(),
                            fb = b.firstname.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                else if(sortBy === "Last Name") {
                    lData.sort((a, b) => {
                        let fa = a.lastname.toLowerCase(),
                            fb = b.lastname.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                else if(sortBy === "Username") {
                    lData.sort((a, b) => {
                        let fa = a.username.toLowerCase(),
                            fb = b.username.toLowerCase();
                    
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

                if(sortBy === "Grade") {
                    lData.sort((a, b) => {
                        return b.grade - a.grade;
                    });
                }
                else if(sortBy === "Points") {
                    lData.sort((a, b) => {
                        return b.points - a.points;
                    });
                }
                else if(sortBy === "First Name") {
                    lData.sort((a, b) => {
                        let fa = a.firstname.toLowerCase(),
                            fb = b.firstname.toLowerCase();
                    
                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    });
                }
                else if(sortBy === "Last Name") {
                    lData.sort((a, b) => {
                        let fa = a.lastname.toLowerCase(),
                            fb = b.lastname.toLowerCase();
                    
                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    });
                }
                else if(sortBy === "Username") {
                    lData.sort((a, b) => {
                        let fa = a.username.toLowerCase(),
                            fb = b.username.toLowerCase();
                    
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

    function getStudents() {
        // console.log(data);
        var lData;
        if(data !== undefined) {
            lData = sortData(data);
        }
        else {
            lData = data;
        }
        
        if (search && lData) {
            // Displays sorted and searched events
            const Sort = filter.toLowerCase();
            return (
                <>
                    {lData.map((users, index) => (
                        (filter === "Grade") ? (
                            (String(users[Sort]).includes(search)) ? (
                                <div className='BoxsC' key={users._id} onClick={() => window.open(`/EditAccount?uid=${users._id}`, "_self")}>
                                    <p className='BoxText'>Firstname: {users.firstname}</p>
                                    <p className='BoxText'>Lastname: {users.lastname}</p>
                                    <p className='BoxText'>Username: {users.username}</p>
                                    <p className='BoxText'>Points: {users.points}</p>
                                    <p className='BoxText'>Grade Level: {users.grade}</p>
                                </div>
                            ) : (<></>)
                        ) : (
                            (users[Sort.replace(/\s+/g, '')].toLowerCase().includes(search.toLowerCase())) ? (
                                <div className='BoxsC' key={users._id} onClick={() => window.open(`/EditAccount?uid=${users._id}`, "_self")}>
                                    <p className='BoxText'>Firstname: {users.firstname}</p>
                                    <p className='BoxText'>Lastname: {users.lastname}</p>
                                    <p className='BoxText'>Username: {users.username}</p>
                                    <p className='BoxText'>Points: {users.points}</p>
                                    <p className='BoxText'>Grade Level: {users.grade}</p>
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
                    {lData.map((users, index) => (
                        <div className='BoxsC' key={users._id} onClick={() => window.open(`/EditAccount?uid=${users._id}`, "_self")}>
                            <p className='BoxText'>Firstname: {users.firstname}</p>
                            <p className='BoxText'>Lastname: {users.lastname}</p>
                            <p className='BoxText'>Username: {users.username}</p>
                            <p className='BoxText'>Points: {users.points}</p>
                            <p className='BoxText'>Grade Level: {users.grade}</p>
                        </div>
                    ))}
                </>
            )
        }
        else{
            return(<div id="message">No Results</div>)
        }
    }
    // Creates and downloads a report
    function CreateReport() {
        if(data) {
            var val = window.prompt("Enter a Report Title:");
            setTitle(val);
            setReportNumber(reportNumber + 1);
        }
        else {
            window.alert("Cannot generate report");
        }   
    }
    // Generates winners for each grade level
    // function GenerateWinners() {
    //     if(data) {
    //         const prizeList = ["Candy", "Stickers", "Stuffed Animal", "Trophy", "Wristband", "Lanyard With School Logo"]
    //         let random = [];
    //         let points = [];
    //         data.forEach((val, index) => {
    //             students["grade"+data[index].grade].push(data[index]);
    //         });
    //         //console.log(students)
    //         let string = "";
    //         Object.keys(students).forEach((val, index, array) => {
    //             students[val].sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0)
    //             let topPoints = students[val][0];
    //             students[val].shift();
    //             let rndWinner = students[val][Math.floor(Math.random()*students[val].length)];
    //             random.push(rndWinner);
    //             points.push(topPoints);
    //         });
    //         console.log(random, points);
    //     }
    //     else {
    //         window.alert("Cannot generate winner report");
    //     }        
    // }
    return (
        <div className='Admin Margin'>
            <h1 className="PageTitle">West-MEC Event Tracker</h1>
            <h2 className="PageTitle">Students</h2>
            <form className="SearchForm">
                {/* Search Bar and DropDown Menu Filter */}
                <input required className='Search' placeholder={`Search By ${filter}`} onChange={(e) => setSearch(e.target.value)}></input>
                <select className='Filter' id="filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value={"First Name"}>First Name</option>
                    <option value={"Last Name"}>Last Name</option>
                    <option value={"Username"}>Username</option>
                    <option value={"Grade"}>Grade</option>
                </select>
            </form>
            <br></br>
            {/* Buttons to Create New Account, Report and Generate a Report */}
            <div className='ButtonsA'>
                <a href='/newaccount' className='AdminB'>Add New Account +</a>
                <a href="/AdminStudents" onClick={() => CreateReport()} className='AdminB'>Generate Report <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></a>
                {/* <a href="/AdminStudents" onClick={() => GenerateWinners()} className='AdminB'>Generate Winners</a> */}
                <select className="AdminB" onChange={(e) => setSortBy(e.target.value)}>
                    <option value={"First Name"}>Sort By First Name</option>
                    <option value={"Last Name"}>Sort By Last Name</option>
                    <option value={"Username"}>Sort By Username</option>
                    <option value={"Grade"}>Sort By Grade</option>
                    <option value={"Points"}>Sort By Points</option>
                </select>
                <select className="AdminB" onChange={(e) => setSortType(e.target.value)}>
                    <option value={"Ascending"}>Ascending</option>
                    <option value={"Descending"}>Descending</option>
                </select>
            </div>
                {getStudents()}
                {/* {(bool) ? (setBool(<></>)):(setBool(true))} */}
        </div>
    );
}
export default AdminStudents;