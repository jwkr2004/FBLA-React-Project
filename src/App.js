import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import NewEvent from "./pages/NewEvent";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import AdminHome from "./pages/AdminHome";
import AdminEvents from "./pages/AdminEvents";
import AdminStudents from "./pages/AdminStudents";
import StudentHome from "./pages/StudentHome";
import StudentPoints from "./pages/StudentPoints";
import StudentEvents from "./pages/StudentEvents";
import { useEffect } from 'react';
import React, { useState } from 'react';
import axios from "axios";

const App = () => {
  const [user, setUser] = useState();
  axios.defaults.withCredentials = true;

  
  useEffect(() => {
        axios
            .get('http://localhost:3001/isloggedin')
            .then((res) => {
                if(!res.data.loggedin && window.location.pathname !== "/login") {
                  console.log("Opening Login Page")
                  window.open("/login", "_self")
                }
                else if(res.data.loggedin && window.location.pathname == "/login") {
                  window.open("/adminhome", "_self")
                }
                if(res.data.loggedin) {
                    if(res.data.user.user.isAdmin) {
                      setUser("Admin")
                    }
                    else {
                      setUser("Student")
                    }
                }
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
  }, []);

  //Loads routes if a user is logged in
  if(user) {
    
    //Loads all of the routes if the user is an admin
    if(user === "Admin") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/AddEvent" element={<NewEvent />} />
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/NewAccount" element={<NewAccount />} />
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/AdminEvents" element={<AdminEvents />} />
            <Route path="/AdminStudents" element={<AdminStudents />} />
            <Route path="/StudentHome" element={<StudentHome />} />
            <Route path="/StudentPoints" element={<StudentPoints />} />
            <Route path="/StudentEvents" element={<StudentEvents />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      );
    }

    //Loads only student routes if the user logged in is not an admin
    else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/StudentHome" element={<StudentHome />} />
            <Route path="/StudentPoints" element={<StudentPoints />} />
            <Route path="/StudentEvents" element={<StudentEvents />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }
  //Loads the login route if a user is not logged in
  else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  /*return (
    <BrowserRouter>
      <Routes>
        <Route path="/AddEvent" element={<NewEvent />} />
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/NewAccount" element={<NewAccount />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminEvents" element={<AdminEvents />} />
        <Route path="/AdminStudents" element={<AdminStudents />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/StudentPoints" element={<StudentPoints />} />
        <Route path="/StudentEvents" element={<StudentEvents />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );*/
}
export default App;