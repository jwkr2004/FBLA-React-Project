 import axios from "axios";
import React, { useState, useEffect } from 'react';
import {escape, unescape} from 'html-escaper';
// import entities from "entities";
function ViewReport() {
    const [grid, setGrid] = useState(true);
    const [data, setData] = useState();
    const [sortType, setSortType] = useState("Ascending");
    const [sortBy, setSortBy] = useState("First Name");
    const [prev, setPrev] = useState("First Name");
    const queryParameters = new URLSearchParams(window.location.search);
    const rid = queryParameters.get("rid");
    useEffect(() => {
        axios
            .post('http://localhost:3001/getreportbyid', {rid})
            .then((res) => {
                let Message = res.data.message;
                if (res.data.message) {
                    document.getElementById("message").innerText = Message;
                }
                setData(res.data.report[0]);
            })
            .catch(err => {
                console.error(err);
            });
    }, [rid]);
    function DownloadReport() {
        if (data.accounts) {
            let string = "";
            data.accounts.forEach((val, index) => {
                string += `Student: ${val._id}\n\nFirstname: ${val.firstname}\nLastname: ${val.lastname}\nUsername: ${val.username}\nGrade: ${val.grade}\nPoints: ${val.points}\n\n\n`
            });
            const blob2 = new Blob([string], { type: "text/plain" });
            const url = URL.createObjectURL(blob2);
            const link = document.createElement("a");
            if (data.title) {
                link.download = data.title + ".txt";
            }
            else {
                link.download = "StudentReport " + data._id + ".txt";
            }
            link.href = url;
            link.click(); 
        }
    }
    function changeSort(inp) {
        if(sortBy === inp) {
            if(sortType === "Ascending") {
                setSortType("Descending");
                document.getElementById(inp).innerHTML = inp + unescape('&darr;');
            }
            else if(sortType === "Descending") {
                setSortType("Ascending");
                document.getElementById(inp).innerHTML = inp + unescape('&uarr;');
            }
        }
        else {
            setSortBy(inp);
            setSortType("Ascending");
            document.getElementById(inp).innerHTML = inp + unescape('&uarr;');
            if(prev !== undefined) {
                document.getElementById(prev).innerHTML = prev;
            }
        }
        setPrev(inp);
    }
    function sortData(lData) {
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
    if(data !== undefined && grid === false) {
        var lData;
        if(data !== undefined) {
            lData = sortData(data.accounts);
        }
        else {
            lData = data.accounts;
        }
        if(data.accounts.length > 0) {
            var pagetitle;
            if(data.title === undefined) {
                pagetitle = "Report";
            }
            else {
                pagetitle = data.title;
            }
            return (
                <div className="Admin Margin">
                    <h1 className="PageTitle">West-MEC Event Tracker</h1>
                    <h2 className="PageTitle">{pagetitle}</h2>
                    <div className="PrizeWinners">
                        <div className="gd g9">
                            <h2>9th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[0].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[0].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[0].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[0].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g10">
                            <h2>10th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[2].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[2].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[3].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[3].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g11">
                            <h2>11th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[4].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[4].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[5].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[5].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g12">
                            <h2>12th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[6].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[6].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[7].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[7].prize}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="ButtonsA">
                        <div onClick={() => DownloadReport()} className='AdminB'>Download <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></div>
                        <div onClick={() => setGrid(true)} className='AdminB'>Change View</div>
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
                    {data.accounts.map((users, index) => (
                        <div className='BoxsH' key={users._id}>
                            <p className='BoxText'>First Name: {users.firstname}</p>
                            <p className='BoxText'>Last Name: {users.lastname}</p>
                            <p className='BoxText'>Username: {users.username}</p>
                            <p className='BoxText'>Points: {users.points}</p>
                            <p className='BoxText'>Grade: {users.grade}</p>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            return(<div id="message"></div>)
        }
    }
    else if(data !== undefined && grid === true) {
        var lData;
        if(data !== undefined) {
            lData = sortData(data.accounts);
        }
        else {
            lData = data.accounts;
        }
        if(lData !== undefined) {
            if(data.title === undefined) {
                pagetitle = "Report";
            }
            else {
                pagetitle = data.title
            }
            return (
                <div className="Admin Margin">
                    <h1 className="PageTitle">West-MEC Event Tracker</h1>
                    <h2 className="PageTitle">{pagetitle}</h2>
                    <div className="PrizeWinners">
                        <div className="gd g9">
                            <h2>9th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[0].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[0].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[0].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[0].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g10">
                            <h2>10th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[2].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[2].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[3].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[3].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g11">
                            <h2>11th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[4].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[4].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[5].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[5].prize}</h4>
                            </div>
                        </div>
                        <div className="gd g12">
                            <h2>12th Grade</h2>
                            <div className="MostPoints">
                                <h3>Top Point Winner</h3>
                                <h4>{data.winners[6].name}</h4>

                                <h3>Prize</h3>
                                <h4>{data.winners[6].prize}</h4>
                            </div>
                            <div className="Random">
                                <h3>Random Winner</h3>
                                <h4>{data.winners[7].name}</h4>
                                <h3>Prize</h3>
                                <h4>{data.winners[7].prize}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="ButtonsA">
                        <div onClick={() => DownloadReport()} className='AdminB'>Download <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></div>
                        <div onClick={() => setGrid(false)} className='AdminB'>Change View</div>
                    </div>
                    <table className="ReportGrid">
                        <thead>
                            <tr>
                                <th id="First Name" onClick={() => changeSort("First Name")}>First Name &uarr;</th>
                                <th id="Last Name" onClick={() => changeSort("Last Name")}>Last Name</th>
                                <th id="Username" onClick={() => changeSort("Username")}>Username</th>
                                <th id="Points" onClick={() => changeSort("Points")}>Points</th>
                                <th id="Grade" onClick={() => changeSort("Grade")}>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.accounts.map((users, index) => (
                                <tr>
                                    <td>{users.firstname}</td>
                                    <td>{users.lastname}</td>
                                    <td>{users.username}</td>
                                    <td>{users.points}</td>
                                    <td>{users.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            return(<div id="message"></div>)
        }
    }
    else {
        return(<></>)
    }
}
export default ViewReport;