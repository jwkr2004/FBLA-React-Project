import '../css/nav.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';
function SetNavBar() {
    //Global Variables
    const [user, setUser] = useState();
    const [btnArr, setBtnArr] = useState();
    useEffect(() => {
        // Gets current User Information
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
        // Sends the User to Their Home Page
        axios
            .get(`http://localhost:3001${url}`)
            .catch(err => {
                console.error(err);
            });
    }
    // Changes NavBar if User is Admin or Not
    useEffect(() => {
        if(user) {
            if (!user.isAdmin) {
                setBtnArr([{ title: "Home", Link: "/StudentHome" }, { title: "Your Points", Link: "/StudentPoints" }, { title: "Events", Link: "/StudentEvents" }, { title: "Log Out", Link: "/logout" }]);
            }
            else if (user.isAdmin) {
                setBtnArr([{ title: "Home", Link: "/AdminHome" }, { title: "Student List", Link: "/AdminStudents" }, { title: "Event List", Link: "/AdminEvents" }, { title: "Reports", Link: "/Reports" }, { title: "New Account", Link: "/NewAccount" }, { title: "Log Out", Link: "/logout" }]);
            }
        }
        else {
            setBtnArr([/*{ title: "Welcome to the Student Event Tracker!", Link: "/login" },*/ { title: "Help Menu", Link: "/help" }]);
        }
    }, [user]);
    // Displays The NavBar
    function navbar() {
        if(btnArr) {
            return(
                <nav>
                    {btnArr.map((items, index) => (
                        <a id={`navButton${index}`} className="navButton" key={`Button${index}`} href={items.Link} onClick={() => urlGet(items.Link)}>{items.title}</a>
                    ))}
                </nav>
            )
        }
        else {
            return(
                <></>
            )
        }
    }
    return (
        <>
            {navbar()}
        </>
    )
}
export default SetNavBar;