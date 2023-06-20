import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendarModel from "../component/FullCalendar";
import LoadingPage from "./LoadingPage";
import { serverUrl, testUrl } from "../const";
import { UserContext } from "../App";

export default function ChooseTimePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState([]); // note down selected event
  const [choices, setChoices] = useState(<div></div>); // for showing of choices on the right side
  const [pickUpNumber, setPickUpNumber] = useState({}); // note down number of pickups in each event
  const [matchData, setMatchData] = useState([]); // note down match data
  const [email, setEmail] = useState("hs56@rice.edu"); // volunteers email
  const { volunteerLoggedIn } = useContext(UserContext); // student logged in or not

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
    console.log("matchData: ", matchData);
  }, [matchData]);

  const checkIsLoggin = () => {
    return volunteerLoggedIn;
  };

  useEffect(() => {
    if (checkIsLoggin() === false) {
      navigate("/login");
      return;
    }
    // get all await students
    const url = serverUrl + "?action=get_all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // TODO:: check if status is true
        if (data.status === true) {
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
    // set Choices to display on side bar
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
    // set post data for matching
    setMatchData([]);
    selected.map((day) => {
      day.map((event, key2) => {
        if (key2 !== 0) {
          const event_breakdown = event.split(" ");
          setMatchData((prev) => [
            ...prev,
            {
              date: event_breakdown[0],
              airport: event_breakdown[1],
              hour: event_breakdown[2],
              number: parseInt(event_breakdown[3]),
              vol_email: email,
            },
          ]);
        }
      });
    });
  }, [selected]);

  const handleBatchMatch = () => {
    if (matchData.length === 0) {
      alert("请先选择接机时间！");
      return;
    }
    matchData.forEach((m_data) => {
      const url = serverUrl + "?action=match";
      let data = {};
      fetch(url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(m_data),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
        .then((response) => response.json(data))
        .then((data) => {
          console.log(data);
          if (data.num_allocated && data.num_allocated > 0) {
            console.log("成功匹配" + data.num_allocated + "人！");
            alert("成功匹配" + data.num_allocated + "人！");
            // navigate("/stustatus");
          } else {
            alert("很遗憾，（部分）选择时间段未能匹配成功！");
            // navigate("/stustatus");
          }
        });
    });
    // navigate("/info");
  };

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
            onClick={handleBatchMatch}
          >
            提交选择
          </button>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
}
