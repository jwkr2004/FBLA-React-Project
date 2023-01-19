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
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setData(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function getStudents() {
        if (search && data) {
            const Sort = filter.toLowerCase();
            return (
                <>
                    {data.map((users, index) => (
                        (filter === "Grade") ? (
                            (String(users[Sort]).includes(search)) ? (
                                <div className='Boxs'>
                                    <p className='BoxText'>Name: {users.lastname}, {users.firstname}</p>
                                    <p className='BoxText'>Username: {users.username}</p>
                                    <p className='BoxText'>Points: {users.points}</p>
                                    <p className='BoxText'>Grade Level: {users.grade}</p>
                                </div>
                            ) : (<></>)
                        ) : (
                                (users[Sort.replace(/\s+/g, '')].toLowerCase().includes(search.toLowerCase())) ? (
                                <div className='Boxs'>
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
                        <div className='Boxs'>
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

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    function CreateReport() {
        var date = new Date();
        var NoTimeDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(); 
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "StudentList-" + NoTimeDate +".txt";
        link.href = url;
        link.click();
    }
    return (
        <div className='Admin'>
            <form>
                <input required className='Search' placeholder={`Enter Student By ${filter} Here`} onChange={(e) => setSearch(e.target.value)}></input>
                <select className='Filter' id="filter" onChange={(e) => setFilter(e.target.value)}>
                    <option value={"First Name"}>First Name</option>
                    <option value={"Last Name"}>Last Name</option>
                    <option value={"Grade"}>Grade</option>
                </select>
            </form>
            <br></br>
            <div className='ButtonsA'>
                <a href='/SortBy' className='AdminB'>SortBy:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="White" className="bi bi-arrow-down" viewBox="0 0 16 14"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" /></svg></a>
                <a href='/newaccount' className='AdminB'>Add New Student+</a>
                <a onClick={() => CreateReport()} className='AdminB'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg> Create Report</a>
            </div>
            {getStudents()}
        </div>
    );
}
export default AdminStudents;