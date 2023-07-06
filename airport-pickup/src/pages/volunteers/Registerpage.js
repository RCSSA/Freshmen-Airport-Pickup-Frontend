import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../const";

export default function RegisterPage(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [phone, setPhone] = useState("");
  const { setVolunteerLoggedIn } = props.setVolunteerLoggedIn; // update volunteer logged in status
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  function onFormSubmit(e) {
    setIsSubmitDisabled(true);
    e.preventDefault();
    const volunteerInfo = {
      firstname: firstName,
      lastname: lastName,
      email,
      wechat,
      phone,
    };

    let data = {};
    let action = "insert_new_vol";
    let url = serverUrl + "?action=" + action;

    fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(volunteerInfo),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json(data))
      .then((data) => {
        console.log(data);
        // if (data.found === true && data.confirmed === true){
        //   props.setStatus(0);
        //   navigate("/status");
        // } else {
        //   if (data.found === true && data.confirmed === false){
        //     props.setStatus(1);
        //     navigate("/status");
        //   } else {
        //     props.setStatus(2);
        //     navigate("/status");
        //   }
        if (data.status === true) {
          props.setStatus(1);
          navigate("/status");
        } else {
          props.setStatus(2);
          navigate("/status");
        }
        // 审核不通过的情况?
      });
  }
  useEffect(() => {
    console.log(`firstname: ${firstName} \n`);
    console.log(`lastname: ${lastName} \n`);
    console.log(`phonenumber: ${phone} \n`);
    console.log(`email: ${email} \n`);
    console.log(`wechat: ${wechat} \n`);
  }, [firstName, lastName, phone, email, wechat]);

  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">接机志愿者注册</h1>
        <div className="col-12 col-md-8">
          谢谢您参与接机！问卷实时更新，欢迎您选择合适的时间！每名志愿者最多选择10名新生~
        </div>
        <div className="my-2">
          免责声明：
          RCSSA在本次活动中只提供一个志愿者和新生匹配的平台，无法为因此产生的后果承担任何责任。在接机过程中可能会出现新生因为海关，行李，天气等原因导致延误，还请您和新生保持联络。希望您可以通过本次活动结识更多的rice新生！
        </div>
        <div className="my-2 color-light-blue">
          友情提醒：新生普遍会携带两个大号托运箱和一个登机箱，请您也考虑行李所需的空间。（家用轿车，小型suv大概可以接下两位新生，大suv可以接下三位新生）
        </div>
        <form className="mt-3 row" onSubmit={(e) => onFormSubmit(e)}>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">名（请输入拼音）</div>
            <input
              type="text"
              pattern="[A-Za-z]+"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name (e.g. Juan)"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">姓（请输入拼音）</div>
            <input
              type="text"
              pattern="[A-Za-z]+"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name (e.g. Huang)"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>邮箱</b>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="@rice.edu"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">微信号</div>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. _ge_huang_"
              value={wechat}
              onChange={(e) => setWechat(e.target.value)}
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>手机号</b> (格式: 123-456-7890){" "}
            </div>
            <input
              type="tel"
              id="phone"
              className="form-control"
              name="phone"
              pattern="[0-9]{3}(-)?[0-9]{3}(-)?[0-9]{4}"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              required
            />
            <label className="form-check-label" for="flexRadioDefault1">
              我已阅读并了解免责声明
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="btn btn-info homepage-btn my-3"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
