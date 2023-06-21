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
import StudentStatusPage from "./pages/students/studentStatusPage";
import BtnAppBar from "./component/BtnAppBar";
import RequireAuth from "./component/RequireAuth";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylings/styleAH.css";
export const UserContext = React.createContext(null);

function App() {
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [volunteerLoggedIn, setVolunteerLoggedIn] = useState(false);
  return (
    <UserContext.Provider
      value={{
        studentLoggedIn: studentLoggedIn,
        setStudentLoggedIn: setStudentLoggedIn,
        volunteerLoggedIn: volunteerLoggedIn,
        setVolunteerLoggedIn: setVolunteerLoggedIn,
      }}
    >
      <BrowserRouter>
        <BtnAppBar/>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/register" element={<Registerpage />}></Route>
          <Route path="/choosetime" element={<ChooseTimePage />}></Route>
          <Route path="/info" element={<TimeInfoPage />}></Route>
          <Route path="/studentlogin" element={<StudentLoginPage />}></Route>
          <Route path="/studentregister" element={<NewStudentPage />}></Route>
          <Route path="/studentstatus" element={<StudentStatusPage />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
