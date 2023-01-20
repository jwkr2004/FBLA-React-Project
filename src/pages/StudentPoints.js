import '../css/StudentPoints.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';
function StudentPoints() {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    //const [sortedUsers, setSortedUsers] = useState([]);
    const [data, setData] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch(err => {
                console.error(err);
            });
        axios
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setUsers(res.data);
                // if (res.data.users) {
                //     setUser(res.data.user);
                // }
            })
            .catch(err => {
                console.error(err);
            });     
    }, []);
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
                    <p className='pushinp'>{sortedUsers[i].username}: {sortedUsers[i].points}</p>
                )
            }
            
            // return (
            //     <div className='Box46' id='Box457'>
            //         <p className='pushinp'>{events.username}: {events.points}</p>
            //     </div>
            // )
            console.log(arr);
            return(arr)
            
        }
    }
    function getPoints() {
        if (user) {
            console.log(user.points)
            return user.points;
        }
    }
    //console.log(user)
    return (
        <div id="StudentHome">
            <h2 id='leader'>Leaderboard</h2>
            <h2 id='_points'>Your Points</h2>
            <div className='Box45' id='Box456'>
                <p id='notpushinp'>{getPoints()}</p>
            </div>
            <div className='Box46' id='Box457'>
                {setLeaderboard()}
            </div>
            
        </div>
    );
}
    
export default StudentPoints;