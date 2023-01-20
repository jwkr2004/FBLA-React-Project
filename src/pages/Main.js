import axios, { Axios } from "axios";
import { useEffect } from 'react';
import React, { useState } from 'react';

const Main = () => {
    const [user, setUser] = useState();
    //const [btnArr, setBtnArr] = useState();
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
    /*function urlGet(url) {
        axios
            .get(`http://localhost:3001${url}`)
            .catch(err => {
                console.error(err);
            });
    }*/
    useEffect(() => {
        //console.log(user);
        if(user) {
            if (!user.isAdmin) {
                window.open("/StudentHome", "_self");
            }
            else if (user.isAdmin) {
                window.open("/AdminHome", "_self");
            }
        }
        else {
            window.open("/Login", "_self");
        }
    }, [user]);
}

export default Main;