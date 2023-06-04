import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Devpage from "./pages/devPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <div className="full-white d-flex justify-content-center align-items-center">
      <div className="row justify-content-center">
        <label
          type="button"
          className="label label-info homepage-btn"
          // onClick={() => navigate("/homepage")}
        >
          接机平台正在快马加鞭开发中，敬请期待...
        </label>
      </div>
    </div> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
