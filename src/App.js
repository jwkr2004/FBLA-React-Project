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

const App = () => {
  useEffect(() => {
        
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AddEvent" element={<NewEvent />} />
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/newaccount" element={<NewAccount />} />
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
export default App;