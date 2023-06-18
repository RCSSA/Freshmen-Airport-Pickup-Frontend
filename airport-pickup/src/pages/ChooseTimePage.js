import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendarModel from "../component/FullCalendar";
import LoadingPage from "./LoadingPage";
import { testUrl } from "../const";

export default function ChooseTimePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState([]); // note down selected event
  const [choices, setChoices] = useState(<div></div>); // for showing of choices on the right side
  const [pickUpNumber, setPickUpNumber] = useState({}); // note down number of pickups in each event

  function fetchEvents() {
    fetch(testUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ((data.status = true)) {
          console.log(data.events);
          return data.events;
        } else {
          return {};
        }
      })
      .catch((err) => console.log(err));
  }

  var eventData = {};

  var [fullCalendarEvents, setFullCalendarEvents] = useState([]);

  const dataManagement = useCallback(
    (eventData) => {
      let idCount = 0;
      let idList = [],
        titles = [],
        dates = [],
        descriptions = [],
        pickUpStructures = [];
      let ids = Object.keys(eventData);
      for (var i = 0; i < ids.length; i++) {
        const key1 = ids[i];
        const date = eventData[key1]["date"];
        const keys2 = Object.keys(eventData[key1]);
        if (keys2.includes("IAH")) {
          idCount += 1;
          titles.push(
            "IAH: " + eventData[key1]["IAH"]["TotalToBePicked"] + " 人"
          );
          dates.push(date);

          const keys3 = Object.keys(eventData[key1]["IAH"]).filter((key3) => {
            return key3 !== "TotalToBePicked";
          });
          let description = [];
          let pickUpStructure = [];
          for (var j = 0; j < keys3.length; j++) {
            description.push([keys3[j], eventData[key1]["IAH"][keys3[j]]]);
            pickUpStructure.push(0);
          }
          descriptions.push(description);
          pickUpStructures.push(pickUpStructure);
        }

        if (keys2.includes("HOU")) {
          idCount += 1;
          titles.push(
            "HOU: " + eventData[key1]["HOU"]["TotalToBePicked"] + " 人"
          );
          dates.push(date);

          const keys3 = Object.keys(eventData[key1]["HOU"]).filter((key3) => {
            return key3 !== "TotalToBePicked";
          });
          let description = [];
          let pickUpStructure = [];
          for (var j = 0; j < keys3.length; j++) {
            description.push([keys3[j], eventData[key1]["HOU"][keys3[j]]]);
            pickUpStructure.push(0);
          }
          descriptions.push(description);
          pickUpStructures.push(pickUpStructure);
        }
      }

      for (var i = 0; i < idCount; i++) {
        idList.push(i);
        pickUpNumber[`${i}`] = pickUpStructures[i];
        setPickUpNumber({ ...pickUpNumber, [`${i}`]: pickUpStructures[i] });
      }

      return [idList, titles, dates, descriptions];
    },
    [eventData, pickUpNumber]
  );

  useEffect(() => {
    fetch(testUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ((data.status = true)) {
          console.log(data.events);
          eventData = data.events;
          let [a, b, c, d] = dataManagement(eventData);
          fullCalendarEvents = [a, b, c, d];
          setFullCalendarEvents([...fullCalendarEvents, a, b, c, d]);
          setLoaded(true);
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setChoices(
      <div>
        {selected.map((day, key) => {
          return (
            <div key={key} style={{ fontSize: "12px" }}>
              {day.map((event, key2) => {
                if (key2 !== 0) {
                  return <div key={key2}>{event}</div>;
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }, [selected]);

  return loaded ? (
    <div className="row justify-content-center py-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">志愿者接机时间选择</h1>
        <div className="mt-0 mb-4">请选择接机时间并完善细节，谢谢~</div>
        <div className="row">
          <div className="col-lg-9 col-12">
            <FullCalendarModel
              selected={selected}
              setSelected={setSelected}
              ids={fullCalendarEvents[0]}
              titles={fullCalendarEvents[1]}
              dates={fullCalendarEvents[2]}
              descriptions={fullCalendarEvents[3]}
              pickUpNumber={pickUpNumber}
              setPickUpNumber={setPickUpNumber}
            />
          </div>
          <div className="col-lg-3 col-12 pt-3 selectedEventsFrame">
            <p className="fw-bold">已选时间段和人数：</p>
            {choices}
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            className="btn btn-info homepage-btn"
            onClick={() => navigate("/info")}
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
}
