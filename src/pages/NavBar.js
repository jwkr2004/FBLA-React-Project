import '../css/Home.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';

function SetNavBar() {
    const [user, setUser] = useState("");
    /*useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);*/
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
        btnArr = [{ title: "Welcome to Student Event Tracker!", Link: "" }]
    }
    return (
        <nav>
            {btnArr.map((items, index) => (
                <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
            ))}
        </nav>
    )
}

export default SetNavBar;