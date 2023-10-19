// import '../css/StudentPoints.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';
function StudentPoints() {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
        //Gets the current Users information
            .get('http://localhost:3001/getuser')
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch(err => {
                console.error(err);
            });
        //Gets all Students Information
        axios
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error(err);
            });     
    }, []);
    //Creates the Leaderboard and Ranks the students by points
    function setLeaderboard() {
        if (users.length > 0) {
            const sortedUsers = users.sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
            var arr = [];
            var num;
            if(sortedUsers.length < 8) {
                num = sortedUsers.length;
            }
            else {
                num = 8;
            }
            for (var i = 0; i < num; i++) {
                arr.push(
                    <p className='pushinp' key={"index" + i}>{sortedUsers[i].username}: {sortedUsers[i].points}</p>
                )
            }
            return(arr)
        }
    }
    //Gets User Points and displays it
    function getPoints() {
        if (user) {
            return user.points;
        }
    }
    return (
        <div id="StudentHome" className="Margin">
            <h1 className="PageTitle">West-MEC Event Tracker</h1>
            <h2 className="PageTitle">Points and Leaderboard</h2>
            <div className="box45Div">
                <div className="box45">
                    <h2 id='_points'>Your Points</h2>
                    <p id='notpushinp'>{getPoints()}</p>
                </div>
                <div className="box45">
                    <h2 id='leader'>Leaderboard</h2>
                    <div className='Box46'>
                        {setLeaderboard()}
                    </div>
                </div>   
            </div> 
        </div>
    );
}
    
export default StudentPoints;