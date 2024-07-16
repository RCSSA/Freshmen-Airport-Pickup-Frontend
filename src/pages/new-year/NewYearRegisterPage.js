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
  const [selectedSchool, setSelectedSchool] = useState(""); // State for selected school
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
  
  function onSchoolOptionChange(e) {
    setSelectedSchool(e.target.value);
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
        <h1 className="fw-bold my-4">2023 Chinese New Year Gala Ticket Form</h1>

        {/* Form introduction & instruction */}
        <div className="col-12 col-md-8 color-light-blue">
          Chinese New Year is the most important holiday in China. Enjoy lion dance, Chinese Kongfu, free Chinese food, free boba tea, performances from students, handcraft workshops, calligraphy, board games, and more at the 2023 Chinese New Year Gala! 
        </div>
        <div className="my-2">
            Time:  Jan. 21 (Saturday)   5:30 P.M.  to  8:30 P.M. 
            <div></div>
            Place: RMC Grand Hall
        </div>
        <div className="my-2">
            The ticket window opens at:
            <div></div>
            Jan 14, 5:30 P.M
            <div></div>
            Jan 16, 5:30 P.M
            <div></div>
            Jan 18, 5:30 P.M
            <div></div>
            Tickets are FREE but limited to 200, 300, and 300 respectively. A ticket is needed to have free 
            food and drinks, otherwise, you can RSVP at the check-in table at the gala. Food is in first come first served.
        </div>

        <div className="my-2">
            Note: This event is only open for students and faculties from the following institutions: 
            <div></div>
            Rice University
            <div></div>
            University of Houston
            <div></div>
            UTHealth Houston
            <div></div>
            Baylor College of Medicine
            <div></div>
            Please make sure you use your university email account to RSVP!!!
            <div></div>
            Only submissions with the above mentioned university email accounts will be recorded. 
            You will receive an email to your provided address regarding your booking result.
        </div>

        <div className="my-2">
            Note also: You can only submit the form once with one email account.
            <div></div>
            If you have any question or concern, you can reach us through our website
            <div></div>
            <a href="http://rcssa.rice.edu/about/#contact-us" target="_blank" rel="noopener noreferrer">
                http://rcssa.rice.edu/about/#contact-us
            </a>
        </div>

        {/* 用户输入部分，根据接机系统改的 */}
        <form className="mt-3 row" onSubmit={(e) => onFormSubmit(e)}>
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">名（请输入拼音）</div>
            <input
              type="text"
              pattern = "[A-Za-z]+"
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
              pattern = "[A-Za-z]+"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name (e.g. Huang)"
              required
            />
          </div>
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>邮箱（请使用您的大学邮箱）</b>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="e.g. xxx@rice.edu"
              required
            />
          </div>
          
          <div className="my-2 col-12 col-md-6">
            <div className="mb-2">
              <b>Student Id</b> (Net ID if you are from Rice){" "}
            </div>
            <input
              type="tel"
              id="phone"
              className="form-control"
              name="phone"
              pattern="[0-9]{3}(-)?[0-9]{3}(-)?[0-9]{4}"
              placeholder="Student Id"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="my-2 col-12">
          <div className="fw-bold mb-2">School</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="schoolOption"
                  value="Rice University"
                  checked={selectedSchool === "Rice University"}
                  onChange={onSchoolOptionChange}
                />{" "}
                Rice University
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="schoolOption"
                  value="University of Houston"
                  checked={selectedSchool === "University of Houston"}
                  onChange={onSchoolOptionChange}
                />{" "}
                University of Houston
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="schoolOption"
                  value="UTHealth Houston"
                  checked={selectedSchool === "UTHealth Houston"}
                  onChange={onSchoolOptionChange}
                />{" "}
                UTHealth Houston
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="schoolOption"
                  value="Baylor College of Medicine"
                  checked={selectedSchool === "Baylor College of Medicine"}
                  onChange={onSchoolOptionChange}
                />{" "}
                Baylor College of Medicine
              </label>
            </div>
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
            I confirm that I am using my university email account from  Rice University,
             or University of Houston, or UTHealth Houston, or Baylor College of Medicine 
             (@rice.edu, @uh.edu, @uth.edu, @bcm.edu, @mdanderson.org, @uth.tmc.edu,  @cougarnet.uh.edu).
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
