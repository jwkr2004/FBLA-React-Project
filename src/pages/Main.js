import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
const Main = () => {
    const [user, setUser] = useState();
    //Gets the current user from the backend
    useEffect(() => {
        axios
            .get('http://localhost:3001/getuser')
            .then((res) => {
                if(res.data.user) {
                    setUser(res.data.user);
                }
                else if(res.data === "User Not Logged In") {
                    setUser("notLoggedIn");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    //Redirects the user to the appropriate page. Ex: Login or Home page
    useEffect(() => {
        console.log(user)
        if(user) {
            if(user === "notLoggedIn"){
                window.open("/Login", "_self");
            }
            else if (!user.isAdmin) {
                window.open("/StudentHome", "_self");
            }
            else if (user.isAdmin) {
                window.open("/AdminHome", "_self");
            }
        }
    }, [user]);
}
export default Main;