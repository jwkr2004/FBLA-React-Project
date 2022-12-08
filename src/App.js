import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import StudentEvents from "./pages/StudentEvents";
import StudentHome from "./pages/StudentHome";
import StudentPoints from "./pages/StudentPoints";
import AdminEvents from "./pages/AdminEvents";
import AdminHome from "./pages/AdminHome";
import AdminStudents from "./pages/AdminStudents";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SEvents" element={<StudentEvents />} />
        <Route path="/SHome" element={<StudentHome />} />
        <Route path="/Points" element={<StudentPoints />} />
        <Route path="/AEvents" element={<AdminEvents />} />
        <Route path="/AHome" element={<AdminHome />} />
        <Route path="/AStudents" element={<AdminStudents />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;