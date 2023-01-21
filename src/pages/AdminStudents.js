import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminStudents() {
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState("First Name");
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
    function getStudents() {
        if (search && data) {
            // Displays sorted and searched events
            const Sort = filter.toLowerCase();
            return (
                <>
                    {data.map((users, index) => (
                        (filter === "Grade") ? (
                            (String(users[Sort]).includes(search)) ? (
                                <div className='Boxs' key={index}>
                                    <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
                                    <p className='BoxText'>Username: {users.username}</p>
                                    <p className='BoxText'>Points: {users.points}</p>
                                    <p className='BoxText'>Grade Level: {users.grade}</p>
                                </div>
                            ) : (<></>)
                        ) : (
                                (users[Sort.replace(/\s+/g, '')].toLowerCase().includes(search.toLowerCase())) ? (
                                <div className='Boxs' key={index}>
                                    <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
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
        else if (!search && data) {
            return (
                <>
                    {data.map((users, index) => (
                        <div className='Boxs' key={index}>
                            <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
                            <p className='BoxText'>Username: {users.username}</p>
                            <p className='BoxText'>Points: {users.points}</p>
                            <p className='BoxText'>Grade Level: {users.grade}</p>
                        </div>
                    ))}
                </>
            )
        }
        else{
            return(<div className="Boxs"><h1>No Results</h1></div>)
        }
    }
    // Creates and downloads a report
    function CreateReport() {
        if(data) {
            var date = new Date();
            const fileData = JSON.stringify(data, null, "\t");
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "StudentReport-" + date +".txt";
            link.href = url;
            link.click();
        }
        else {
            window.alert("Cannot generate report");
        }
        
    }
    // Generates winners for each grade level
    function GenerateWinners() {
        if(data) {
            const prizeList = ["Candy", "Stickers", "Stuffed Animal", "Trophy", "Wristband", "Lanyard With School Logo"]
            const students = {
                grade9:[],
                grade10:[],
                grade11:[],
                grade12:[]
            };
            data.forEach((val, index) => {
                students["grade"+data[index].grade].push(data[index]);
            });
            //console.log(students)
            let string = "";
            Object.keys(students).forEach((val, index, array) => {
                students[val].sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0)
                let topPoints = students[val][0];
                students[val].shift();
                let rndWinner = students[val][Math.floor(Math.random()*students[val].length)];
                string += `Grade ${index+9}: \nRandom Winner: ${rndWinner.username}\nPoint Count: ${rndWinner.points}\n\nMost Points Winner: ${topPoints.username}\nPoint Count: ${topPoints.points}\n------------------------------\n`
            });
            string += "Available Prizes: " + prizeList;

            var date = new Date();
            const blob = new Blob([string], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "GeneratedWinners-" + date +".txt";
            link.href = url;
            link.click();
        }
        else {
            window.alert("Cannot generate winner report");
        }        
    }
    return (
        <div className='Admin'>
            <form>
                {/* Search Bar and DropDown Menu Filter */}
                <input required className='Search' placeholder={`Enter Student By ${filter} Here`} onChange={(e) => setSearch(e.target.value)}></input>
                <select className='Filter' id="filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value={"First Name"}>First Name</option>
                    <option value={"Last Name"}>Last Name</option>
                    <option value={"Grade"}>Grade</option>
                </select>
            </form>
            <br></br>
            {/* Buttons to Create New Account, Report and Generate a Report */}
            <div className='ButtonsA'>
                <a href='/newaccount' className='AdminB'>Add New Account +</a>
                <a href="/AdminStudents" onClick={() => CreateReport()} className='AdminB'>Create Report <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></a>
                <a href="/AdminStudents" onClick={() => GenerateWinners()} className='AdminB'>Generate Winners</a>
            </div>
            {getStudents()}
        </div>
    );
};
export default AdminStudents;