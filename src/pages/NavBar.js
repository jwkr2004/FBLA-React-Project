import '../css/nav.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';

function SetNavBar() {
    const [user, setUser] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                if(res.data.username) {
                    setUser(res.data.username);
                }
                //console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function urlGet(url) {
        axios
            .get(`http://localhost:3001${url}`)
            .catch(err => {
                console.error(err);
            });
    }
    var btnArr;

    if (user === "Student") {
        btnArr = [{ title: "Home", Link: "/StudentHome" }, { title: "Your Points", Link: "/StudentPoints" }, { title: "Events", Link: "/StudentEvents" }];
    }
    else if (user === "Admin") {
        btnArr = [{ title: "Home", Link: "/AdminHome" }, { title: "Student List", Link: "/AdminStudents" }, { title: "Event List", Link: "/AdminEvents" }, { title: "New Account", Link: "/NewAccount" }];
    }
    else {
        btnArr = [{ title: "Welcome to the Student Event Tracker!", Link: "/" }]
    }

    function logout() {
        axios
            .get('http://localhost:3001/logout')
            .then(() => {
                window.open("/", "_self")
            })
            .catch(err => {
                console.error(err);
            });
    }

    function checkSession() {
        if(user) {
            return(
                <div id="userDetails">
                    <h2>Welcome, {user}</h2>
                    <a href="/login" id="logout" onClick={() => logout()}>Logout</a>
                </div>
            )
        }
        else {
            return(
                <div id="userDetails">
                    <a href="/login" id="login">Login</a>
                </div>
            )
        }
    }
    return (
        <nav>
            {btnArr.map((items, index) => (
                <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
            ))}
            {checkSession()}
        </nav>
    )
}

export default SetNavBar;