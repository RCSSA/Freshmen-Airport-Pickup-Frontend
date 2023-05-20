import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-bootstrap-time-picker";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

export default function NewStudentPage() {
  //   const navigate = useNavigate();
  const [arriveDate, setArriveDate] = useState(new Date());
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
                  required
                />
                <div class="invalid-feedback">
                  Please provide a valid phone number.
                </div>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-6 mb-3">
                <label for="validationCustom03">Rice ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom05"
                  placeholder="Rice ID (example: yk01)"
                  required
                />
                <div class="invalid-feedback">Please provide a rice id.</div>
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
                    checked
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
