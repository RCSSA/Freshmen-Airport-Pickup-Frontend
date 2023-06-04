import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export default function NewStudentPage() {
  //   const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [riceID, setRiceID] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("");
  const [arriveDate, setArriveDate] = useState(new Date());

  useEffect(() => {
    console.log(`firstname: ${firstName} \n`);
    console.log(`lastname: ${lastName} \n`);
    console.log(`phonenumber: ${phoneNumber} \n`);
    console.log(`riceid: ${riceID} \n`);
    console.log(`flightnumber: ${flightNumber} \n`);
    console.log(`airport: ${airport} \n`);
    console.log(`arrivedate: ${arriveDate} \n`);
  }, [
    firstName,
    lastName,
    phoneNumber,
    riceID,
    flightNumber,
    airport,
    arriveDate,
  ]);

  return (
    <div class="justify-content-center form">
      <div class="row spacing">
        <div class="col-md-1 mb-3"> </div>
        <div class="col-md-10 mb-3">
          <h2> Please enter your flight information</h2>
          <form class="needs-validation" novalidate>
            <div class="row form-row">
              <div class="col-md-4 mb-3">
                <label for="validationCustom01">First name</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationCustom02">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom02"
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="row form-row">
              <div class="col-md-6 mb-3">
                <label for="validationCustom03">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <div class="invalid-feedback">
                  Please provide a valid phone number.
                </div>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-6 mb-3">
                <label for="validationCustom05">Rice ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom05"
                  placeholder="Rice ID (example: yw01)"
                  onChange={(e) => setRiceID(e.target.value)}
                  required
                />

                <div class="invalid-feedback">Please provide a rice id.</div>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-6 mb-3">
                <label for="validationCustom06">Flight Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom06"
                  placeholder="Flight Number (example: NH114)"
                  onChange={(e) => setFlightNumber(e.target.value)}
                  required
                />
                <div class="invalid-feedback">
                  Please provide a Flight Number.
                </div>
              </div>
            </div>

            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Airport</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                    onClick={() => setAirport("IAH")}
                    defaultChecked
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Houston Intercontinental Airport(IAH)
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="option2"
                    onClick={() => setAirport("HOU")}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    William P. Hobby Airport(HOU)
                  </label>
                </div>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-6 mb-3">
                <label for="datepicker">Arriving Time (CST)</label>
                <br />
                <DateTimePicker
                  id="datepicker"
                  onChange={setArriveDate}
                  value={arriveDate}
                />
              </div>
            </div>

            <button class="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
