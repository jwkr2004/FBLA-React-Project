import axios from "axios";
import React, { useState, useEffect } from 'react';
function ViewReport() {
    const [grid, setGrid] = useState(true);
    const [data, setData] = useState();
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
    if(data !== undefined && grid === false) {
        if(data.accounts.length > 0) {
            var pagetitle;
            if(data.title === undefined) {
                pagetitle = "Report";
            }
            else {
                pagetitle = data.title
            }
            return (
                <div className="Admin">
                    <h1 className="Center">{pagetitle}</h1>
                    <div className="ButtonsDiv">
                        <div onClick={() => DownloadReport()} className='DownloadB'>Download <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></div>
                        <div onClick={() => setGrid(true)} className='DownloadB'>Change View</div>
                    </div>
                    {data.accounts.map((users, index) => (
                        <div className='Boxs' key={users._id}>
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
        if(data.accounts.length > 0) {
            if(data.title === undefined) {
                pagetitle = "Report";
            }
            else {
                pagetitle = data.title
            }
            return (
                <div className="Admin">
                    <h1 className="Center">{pagetitle}</h1>
                    <div className="ButtonsDiv">
                        <div onClick={() => DownloadReport()} className='DownloadB'>Download <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="-2 -5 20 20"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg></div>
                        <div onClick={() => setGrid(false)} className='DownloadB'>Change View</div>
                    </div>
                    <table className="ReportGrid">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Points</th>
                                <th>Grade</th>
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