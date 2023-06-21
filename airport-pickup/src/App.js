import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/volunteers/Registerpage";
import Loginpage from "./pages/volunteers/Loginpage";
import ChooseTimePage from "./pages/volunteers/ChooseTimePage";
import TimeInfoPage from "./pages/volunteers/TimeInfoPage";
import NewStudentPage from "./pages/students/newStudentPage";
import StudentLoginPage from "./pages/students/studentLogin";
import StudentStatusPage from "./pages/StatusPage";
import BtnAppBar from "./component/BtnAppBar";
import StudentAllocatePage from "./pages/students/studentAllocatePage";
import RequireAuth from "./component/RequireAuth";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylings/styleAH.css";

function App() {
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [volunteerLoggedIn, setVolunteerLoggedIn] = useState(false);
  const [status, setStatus] = useState(0);
  return (
      <BrowserRouter>
        <BtnAppBar/>
        <Routes>
          {/* volunteer */}
          <Route path="/" element={<Homepage setStudentLoggedIn={setStudentLoggedIn} setVolunteerLoggedIn={setVolunteerLoggedIn}/>}></Route>
          <Route path="/login" element={<Loginpage setVolunteerLoggedIn={setVolunteerLoggedIn}/>}></Route>
          <Route path="/register" element={<Registerpage setVolunteerLoggedIn={setVolunteerLoggedIn}/>}></Route>
          <Route path="/volunteerstatus" element={
            <RequireAuth user={volunteerLoggedIn}>
              <StudentStatusPage status={status}/>
            </RequireAuth>}>
          </Route>
          <Route path="/choosetime" element={
            <RequireAuth user={volunteerLoggedIn}>
              <ChooseTimePage />
            </RequireAuth>
          }></Route>
          <Route path="/info" element={
            <RequireAuth user={volunteerLoggedIn}>
              <TimeInfoPage />
            </RequireAuth>
          }></Route>
          {/* student */}
          <Route path="/studentlogin" element={<StudentLoginPage setStudentLoggedIn={setStudentLoggedIn}/>}></Route>
          <Route path="/studentregister" element={<NewStudentPage setStudentLoggedIn={setStudentLoggedIn}/>}></Route>
          <Route path="/studentstatus" element={
            <RequireAuth user={studentLoggedIn}>
              <StudentStatusPage status={status}/>
            </RequireAuth>}>
          </Route>
          <Route path="/studentallocate" element={
            <RequireAuth user={studentLoggedIn}>
              <StudentAllocatePage />
            </RequireAuth>}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
