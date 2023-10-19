//Displays the Footer
import React, { useState, useEffect } from 'react';
import axios from "axios";
const Footer = () => {
    const [theme, setTheme] = useState('dark');
    const [user, setUser] = useState();
    const [userTheme, setUsertheme] = useState();
    if(theme) {
      // console.log(theme);
      document.body.className = theme;
    }
    const toggleTheme = () => {
      if(theme){
        if (theme === 'light') {
          setTheme('dark');
          // console.log("setDark")
        } else {
          setTheme('light');
          // console.log("setlight")
        }
      }
    };
    useEffect(() => {
      axios
      //Gets Current user account
      .get('http://localhost:3001/getuser')
      .then((res) => {
          if(res.data !== "User Not Logged In") {
            const doc = res.data.user;
            setTheme('dark');
            setUser(doc.username);
          }
      })
      .catch(err => {
          console.error(err);
      });
    },[]);
    useEffect(() => {
      if(user && theme) {
        axios
        .post('http://localhost:3001/updateTheme', {user, theme})
        .then((res) => {
          // window.location.reload();
        })
        .catch(err => {
            console.error(err);
        });
      }
      }, [theme]);
    return (
        <footer id="Footer">
            <div className="description">
                <p>Coding {"&"} Programming FBLA 2022-2023</p>
                <p>By Brandon Grigg, Kennyth Greene, and Joshua Walker</p>
            </div>
            <div className="darkModeParent">
                <label className="switch">
                    <input type="checkbox"/>
                    <span onClick={() => toggleTheme()} className="slider round"></span>
                </label>
                <label>Dark Mode</label>
            </div>
        </footer>
    );
}
export default Footer;