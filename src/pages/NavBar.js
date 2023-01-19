import '../css/nav.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';

function SetNavBar() {
    const [user, setUser] = useState();
    const [btnArr, setBtnArr] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                //console.log(res.data);
                if(res.data.user) {
                    setUser(res.data.user);
                }
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
    useEffect(() => {
        //console.log(user);
        if(user) {
            if (!user.isAdmin) {
                setBtnArr([{ title: "Home", Link: "/StudentHome" }, { title: "Your Points", Link: "/StudentPoints" }, { title: "Events", Link: "/StudentEvents" }, { title: "Log Out", Link: "/logout" }]);
            }
            else if (user.isAdmin) {
                setBtnArr([{ title: "Home", Link: "/AdminHome" }, { title: "Student List", Link: "/AdminStudents" }, { title: "Event List", Link: "/AdminEvents" }, { title: "New Account", Link: "/NewAccount" }, { title: "Log Out", Link: "/logout" }]);
            }
        }
        else {
            setBtnArr([{ title: "Welcome to the Student Event Tracker! Click to log in", Link: "/login" }]);
        }
    }, [user]);

    function logout() {
        axios
            .get('http://localhost:3001/logout')
            .then(() => {
                console.log("logged Out!")
            })
            .catch(err => {
                console.error(err);
            });
    }

    function navbar() {
        if(btnArr) {
            return(
                <>
                    {btnArr.map((items, index) => (
                        <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
                    ))}
                </>
            )
        }
        else {
            return(
                <></>
            )
        }
    }
    return (
        <nav>
            {/*btnArr.map((items, index) => (
                <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
            ))*/}
            {navbar()}
        </nav>
    )
}

export default SetNavBar;