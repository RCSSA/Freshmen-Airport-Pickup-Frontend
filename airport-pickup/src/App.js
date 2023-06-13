import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DevPage from "./pages/devPage";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import ChooseTimePage from "./pages/ChooseTimePage";
import TimeInfoPage from "./pages/TimeInfoPage";
import NewStudentPage from "./pages/newStudentPage";
import FullCalendarTest from "./component/FullCalendar";
import StudentStatusPage from "./pages/studentStatusPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./stylings/styleAH.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevPage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/register" element={<Registerpage />}></Route>
        <Route path="/choosetime" element={<ChooseTimePage />}></Route>
        <Route path="/info" element={<TimeInfoPage />}></Route>
        <Route path="/calendartest" element={<FullCalendarTest />}></Route>
        <Route path="/nstudent" element={<NewStudentPage />}></Route>
        <Route path="/stustatus" element={<StudentStatusPage />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
