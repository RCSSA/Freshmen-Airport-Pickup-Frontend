import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import ChooseTimePage from "./pages/ChooseTimePage";
import TimeInfoPage from "./pages/TimeInfoPage";
import NewStudentPage from "./pages/newStudentPage";
import StudentLoginPage from "./pages/studentLogin";
import FullCalendarTest from "./component/FullCalendar";
import StudentOrVolunteer from "./pages/StudentOrVolunteer";
import StudentStatusPage from "./pages/studentStatusPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylings/styleAH.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<StudentOrVolunteer/>}></Route>
      <Route path="/volunteerhome" element={<Homepage/>}></Route>
      <Route path="/login" element={<Loginpage/>}></Route>
      <Route path="/register" element={<Registerpage/>}></Route>
      <Route path="/choosetime" element={<ChooseTimePage/>}></Route>
      <Route path="/info" element={<TimeInfoPage/>}></Route>
      <Route path="/calendartest" element={<FullCalendarTest/>}></Route>
        <Route path="/stulogin" element={<StudentLoginPage />}></Route>
        <Route path="/nstudent" element={<NewStudentPage />}></Route>
        <Route path="/stustatus" element={<StudentStatusPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
