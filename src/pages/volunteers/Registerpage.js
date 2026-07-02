import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
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
    e.preventDefault()

    const firstInitial = firstName[0].toLowerCase()
    const lastInitial = lastName[0].toLowerCase()
    const emailPrefix = email.split("@")[0].toLowerCase()
    if (!email.endsWith("@rice.edu") || !emailPrefix.includes(firstInitial) || !emailPrefix.includes(lastInitial)) {
      message.error("请使用正确的 Rice 邮箱")
      return
    }

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
        // console.log(data);
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
  // useEffect(() => {
  //   console.log(`firstname: ${firstName} \n`);
  //   console.log(`lastname: ${lastName} \n`);
  //   console.log(`phonenumber: ${phone} \n`);
  //   console.log(`email: ${email} \n`);
  //   console.log(`wechat: ${wechat} \n`);
  // }, [firstName, lastName, phone, email, wechat]);

  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">接机志愿者注册</h1>
        <div className="col-12 col-md-8">
        </div>
        <div className="my-2">
          免责声明：
          RCSSA仅提供志愿者与新生的匹配平台，不对活动中产生的任何后果承担责任。接机过程中如遇海关、行李或天气等原因导致延误，请与新生保持联络。期待您通过本次活动结识更多Rice新生！
        </div>
        <div className="my-2 color-light-blue">
          友情提醒：新生通常携带两个大型托运箱及一个登机箱，请根据车辆空间合理安排接送人数。（普通轿车/小型SUV建议接2人，大型SUV可接3人）
        </div>
        <div className="my-2" style={{color: "red"}}>
          注意：志愿者须亲自驾车或随车接机，不得借此活动宣传政治/宗教内容。经RCSSA IT核实的违规行为将被列入黑名单，影响后续参与RCSSA活动（解释权归RCSSA所有）。
        </div>

        <form className="mt-3 row" onSubmit={(e) => onFormSubmit(e)}>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">名（请输入拼音）</div>
            <input
              type="text"
              pattern = "[A-Za-z]+"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FirstName"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">姓（请输入拼音）</div>
            <input
              type="text"
              pattern = "[A-Za-z]+"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LastName"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>邮箱（请使用小写英文initial的@rice.edu 邮箱）</b>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="aabb@rice.edu"
              title={"请使用正确的rice邮箱"}
              pattern=".+@rice\.edu"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">微信号</div>
            <input
              type="text"
              className="form-control"
              placeholder="Wechat ID"
              value={wechat}
              onChange={(e) => setWechat(e.target.value)}
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>手机号</b>
            </div>
            <input
              type="tel"
              id="phone"
              className="form-control"
              name="phone"
              pattern="[0-9]{3}(-)?[0-9]{3}(-)?[0-9]{4}"
              placeholder="1234567890"
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
