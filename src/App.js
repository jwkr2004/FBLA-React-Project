import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import NoPage from "./pages/NoPage";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import Reports from "./pages/AdminReports";
import ViewReport from "./pages/ViewReport";
import NewAccount from "./pages/NewAccount";
import EditAccount from "./pages/EditAccount";
import AdminHome from "./pages/AdminHome";
import AdminEvents from "./pages/AdminEvents";
import AdminStudents from "./pages/AdminStudents";
import AdminVerification from "./pages/AdminVerification";
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
                if(!res.data.loggedin && window.location.pathname.toLowerCase() !== "/login") {
                  window.open("/login", "_self");
                }
                else if(res.data.loggedin && window.location.pathname.toLowerCase() === "/login") {
                  window.open("/", "_self");
                }
                if(res.data.loggedin) {
                    if(res.data.user.user.isAdmin) {
                      setUser("Admin");
                    }
                    else {
                      setUser("Student");
                    };
                };
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
            <Route path="/" element={<Main />} />
            <Route path="/AddEvent" element={<NewEvent />} />
            <Route path="/EditEvent" element={<EditEvent />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/NewAccount" element={<NewAccount />} />
            <Route path="/EditAccount" element={<EditAccount />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/ViewReport" element={<ViewReport />} />
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/AdminEvents" element={<AdminEvents />} />
            <Route path="/AdminStudents" element={<AdminStudents />} />
            <Route path="/AdminVerification" element={<AdminVerification />} />
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
            <Route path="/" element={<Main />} />
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
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
};
export default App;