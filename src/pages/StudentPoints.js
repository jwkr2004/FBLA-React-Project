import '../css/StudentPoints.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';
function StudentPoints() {
    const [user, setUser] = useState();
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
    }, []);
    function getPoints() {
        if (user) {
            console.log(user.points)
            return user.points;
        }
    }
    console.log(user)
    return (
        <div id="StudentHome">
            <h2 id='leader'>Leaderboard</h2>
            <h2 id='_points'>Your Points</h2>
            <div className='Box45' id='Box456'>
                <p id='notpushinp'>{getPoints()}</p>
            </div>
            <div className='Box46' id='Box457'>
                <p className='pushinp'>Leader1</p>
                <p className='pushinp'>Leader2</p>
                <p className='pushinp'>Leader3</p>
                <p className='pushinp'>Leader4</p>
                <p className='pushinp'>Leader5</p>
                <p className='pushinp'>Leader6</p>
                <p className='pushinp'>Leader7</p>
                <p className='pushinp'>Leader8</p>
            </div>
        </div>
    );
}
    
export default StudentPoints;