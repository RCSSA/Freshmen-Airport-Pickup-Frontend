import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registerpage() {
  const navigate = useNavigate();
  function onFormSubmit(e) {
    e.preventDefault();
    navigate("/choosetime");
  }
  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">接机志愿者注册</h1>
        <div className="my-2">
          谢谢您参与接机！问卷实时更新，欢迎您选择合适的时间！如果想要接多位学生可多次提交本问卷~
        </div>
        <div className="my-2">
          免责声明：
          RCSSA在本次活动中只提供一个志愿者和新生匹配的平台，无法为因此产生的后果承担任何责任。在接机过程中可能会出现新生因为海关，行李，天气等原因导致延误，还请您和新生保持联络。希望您可以通过本次活动结识更多的rice新生！
        </div>
        <div className="my-2">
          友情提醒：新生普遍会携带两个大号托运箱和一个登机箱，请您也考虑行李所需的空间。（家用轿车，小型suv大概可以接下两位新生，大suv可以接下三位新生）
        </div>

        <form className="mt-3 row" onSubmit={(e) => onFormSubmit(e)}>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">姓名</div>
            <input type="text" className="form-control" placeholder="" />
          </div>
          <div className="my-2 col-12 col-md-6"></div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">邮箱</div>
            <input type="email" className="form-control" placeholder="" />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">微信号</div>
            <input type="text" className="form-control" placeholder="" />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">手机号</div>
            <input type="number" className="form-control" placeholder="" />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">其他联系方式</div>
            <input type="text" className="form-control" placeholder="" />
          </div>

          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              required
            />
            <label className="form-check-label" for="flexRadioDefault1">
              我已阅读并了解免责声明
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-info homepage-btn my-3">
              下一步
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
