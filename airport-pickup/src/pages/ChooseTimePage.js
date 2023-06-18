import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendarModel from "../component/FullCalendar";
import LoadingPage from "./LoadingPage";
export default function ChooseTimePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState([]); // note down selected event
  const [choices, setChoices] = useState(<div></div>); // for showing of choices on the right side
  const [pickUpNumber, setPickUpNumber] = useState({}); // note down number of pickups in each event

  var sampleData = {
    8: {
      date: "2023-05-13",
      HOU: { TotalToBePicked: 3, "10:00-12:00": 2, "14:00-16:00": 1 },
      IAH: {
        TotalToBePicked: 8,
        "10:00-12:00": 2,
        "14:00-16:00": 4,
        "16:00-18:00": 2,
      },
    },

    2: {
      date: "2023-05-14",
      HOU: {
        TotalToBePicked: 10,
        "10:00-12:00": 2,
        "14:00-16:00": 5,
        "16:00-18:00": 3,
      },
      IAH: {
        TotalToBePicked: 7,
        "10:00-12:00": 1,
        "14:00-16:00": 4,
        "16:00-18:00": 2,
      },
    },

    5: {
      date: "2023-05-17",
      IAH: {
        TotalToBePicked: 5,
        "10:00-12:00": 1,
        "14:00-16:00": 2,
        "16:00-18:00": 2,
      },
    },
  };

  var [fullCalendarEvents, setFullCalendarEvents] = useState([]);

  const dataManagement = useCallback(
    (sampleData) => {
      let idCount = 0;
      let idList = [],
        titles = [],
        dates = [],
        descriptions = [],
        pickUpStructures = [];
      let ids = Object.keys(sampleData);
      for (var i = 0; i < ids.length; i++) {
        const key1 = ids[i];
        const date = sampleData[key1]["date"];
        const keys2 = Object.keys(sampleData[key1]);
        if (keys2.includes("IAH")) {
          idCount += 1;
          titles.push(
            "IAH: " + sampleData[key1]["IAH"]["TotalToBePicked"] + " 人"
          );
          dates.push(date);

          const keys3 = Object.keys(sampleData[key1]["IAH"]).filter((key3) => {
            return key3 !== "TotalToBePicked";
          });
          let description = [];
          let pickUpStructure = [];
          for (var j = 0; j < keys3.length; j++) {
            description.push([keys3[j], sampleData[key1]["IAH"][keys3[j]]]);
            pickUpStructure.push(0);
          }
          descriptions.push(description);
          pickUpStructures.push(pickUpStructure);
        }

        if (keys2.includes("HOU")) {
          idCount += 1;
          titles.push(
            "HOU: " + sampleData[key1]["HOU"]["TotalToBePicked"] + " 人"
          );
          dates.push(date);

          const keys3 = Object.keys(sampleData[key1]["HOU"]).filter((key3) => {
            return key3 !== "TotalToBePicked";
          });
          let description = [];
          let pickUpStructure = [];
          for (var j = 0; j < keys3.length; j++) {
            description.push([keys3[j], sampleData[key1]["HOU"][keys3[j]]]);
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
    [sampleData, pickUpNumber]
  );

  useEffect(() => {
    let [a, b, c, d] = dataManagement(sampleData);
    fullCalendarEvents = [a, b, c, d];
    setFullCalendarEvents([...fullCalendarEvents, a, b, c, d]);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
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
