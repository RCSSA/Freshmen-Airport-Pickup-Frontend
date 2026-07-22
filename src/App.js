import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/volunteers/Registerpage";
import Loginpage from "./pages/volunteers/Loginpage";
import ChooseTimePage from "./pages/volunteers/ChooseTimePage";
import TimeInfoPage from "./pages/volunteers/TimeInfoPage";
import NewStudentPage from "./pages/students/newStudentPage";
import StudentLoginPage from "./pages/students/studentLogin";
import StatusPage from "./pages/StatusPage";
import BtnAppBar from "./component/BtnAppBar";
import StudentAllocatePage from "./pages/students/studentAllocatePage";
import RequireAuth from "./component/RequireAuth";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylings/styleAH.css";
import MidAutumnRegisterPage from "./pages/mid-autumn/MidautumnRegisterPage";
import NewYearRegisterPage from "./pages/new-year/NewYearRegisterPage";

function App() {
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [volunteerLoggedIn, setVolunteerLoggedIn] = useState(false);
  const [status, setStatus] = useState(3);
  const [progress, setProgress] = useState(0);
  const [studentName, setStudentName] = useState("");
  // const [volName, setVolName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volInfo, setVolInfo] = useState({});
  const [studentInfo, setStudentInfo] = useState({});
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    document.title = "RCSSA Airport Pickup Platform";
  }, []);

  return (
    <HashRouter>
      <BtnAppBar />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setStudentLoggedIn={setStudentLoggedIn}
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setVolEmail={setVolEmail}
              setVolInfo={setVolInfo}
              setStudentList={setStudentList}
            />
          }
        ></Route>
        <Route path="/status" element={<StatusPage status={status} />}></Route>

        {/* volunteer */}
        <Route
          path="/login"
          element={
            <Loginpage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
              setVolEmail={setVolEmail}
              setStudentList={setStudentList}
              setVolInfo={setVolInfo}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Registerpage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
            />
          }
        ></Route>
        <Route
          path="/choosetime"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <ChooseTimePage volEmail={volEmail} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/info"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <TimeInfoPage
                studentList={studentList}
                volEmail={volEmail}
                setStudentList={setStudentList}
                volInfo={volInfo}
              />
            </RequireAuth>
          }
        ></Route>

        {/* student */}
        <Route
          path="/studentlogin"
          element={
            <StudentLoginPage
              setStudentLoggedIn={setStudentLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setVolInfo={setVolInfo}
              setStudentInfo={setStudentInfo}
            />
          }
        ></Route>
        <Route
          path="/studentregister"
          element={
            <NewStudentPage
              setStudentLoggedIn={setStudentLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setStudentInfo={setStudentInfo}
            />
          }
        ></Route>
        <Route
          path="/studentallocate"
          element={
            <RequireAuth user={studentLoggedIn}>
              <StudentAllocatePage
                progress={progress}
                studentEmail={studentEmail}
                studentName={studentName}
                volInfo={volInfo}
                studentInfo={studentInfo}
              />
            </RequireAuth>
          }
        ></Route>

        {/* mid-autumn */}
        <Route
          path="/login"
          element={
            <Loginpage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
              setVolEmail={setVolEmail}
              setStudentList={setStudentList}
              setVolInfo={setVolInfo}
            />
          }
        ></Route>
        <Route
          path="/midautumnregister"
          element={
            <MidAutumnRegisterPage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
            />
          }
        ></Route>
        <Route
          path="/choosetime"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <ChooseTimePage volEmail={volEmail} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/info"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <TimeInfoPage
                studentList={studentList}
                volEmail={volEmail}
                setStudentList={setStudentList}
                volInfo={volInfo}
              />
            </RequireAuth>
          }
        ></Route>

        {/* new-year */}
        <Route
          path="/login"
          element={
            <Loginpage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
              setVolEmail={setVolEmail}
              setStudentList={setStudentList}
              setVolInfo={setVolInfo}
            />
          }
        ></Route>
        <Route
          path="/newyearregister"
          element={
            <NewYearRegisterPage
              setVolunteerLoggedIn={setVolunteerLoggedIn}
              setStatus={setStatus}
              setProgress={setProgress}
            />
          }
        ></Route>
        <Route
          path="/choosetime"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <ChooseTimePage volEmail={volEmail} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/info"
          element={
            <RequireAuth user={volunteerLoggedIn}>
              <TimeInfoPage
                studentList={studentList}
                volEmail={volEmail}
                setStudentList={setStudentList}
                volInfo={volInfo}
              />
            </RequireAuth>
          }
        ></Route>
        
      </Routes>
    </HashRouter>
  );
}

export default App;
