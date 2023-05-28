import React from "react";
import { useNavigate } from "react-router-dom";

export default function Devpage() {
  const navigate = useNavigate();
  return (
    <div className="full-white d-flex justify-content-center align-items-center">
      <div className="row justify-content-center">
        <label
          type="button"
          className="label label-info homepage-btn"
          // onClick={() => navigate("/homepage")}
        >
          接机平台正在快马加鞭开发中，敬请期待...
        </label>
      </div>
    </div>
  );
}
