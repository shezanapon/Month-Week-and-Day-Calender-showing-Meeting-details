import {
  Eventcalendar,
  getJson,
  setOptions,
  CalendarNav,
  SegmentedGroup,
  SegmentedItem,
  CalendarPrev,
  CalendarToday,
  CalendarNext,
} from "@mobiscroll/react";
import { Box, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";

setOptions({
  theme: "ios",
  themeVariant: "light",
});
const ZOHO = window.ZOHO;
function MonthlyCalender() {
  const [view, setView] = useState("month");
  const [myEvents, setEvents] = useState([]);

  const [zohoLoaded, setZohoLoaded] = useState(false);

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      console.log(data);
    });

    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }, []);

  // const [allData, setAllData] =useState([]);

  useEffect(() => {
    if (zohoLoaded) {
      ZOHO.CRM.API.getAllRecords({
        Entity: "Events",
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (data) {
        let newEvent = [];
        console.log(data);
        data.data.forEach((event) => {
          newEvent.push({
            start: event.Start_DateTime,
            end: event.End_DateTime,
            title:
              "Name: " +
              event?.Who_Id?.name +
              "<br/>" +
              event?.Event_Title +
              "<br/> Address: " +
              event.Venue,
            color: "#35bb5a",
          });
        });

        setEvents([...newEvent]);
      });
    }
    // setEvents([...myEvents, newEvent]);
  }, [zohoLoaded]);

  const [calView, setCalView] = useState({
    schedule: {
      type: "month",
      startDay: 1,
      endDay: 5,
      startTime: "09:00",
      endTime: "17:00",
      timeCellStep: 60,
      timeLabelStep: 60,
    },
  });

  // const renderLabel = useCallback((data) => {
  //   return (
  //     <>
  //       <Box
  //         p={1}
  //         sx={{
  //           bgcolor: "#01579b",
  //           color: "white",
  //           borderRadius: "4px",
  //           width: "100%",
  //         }}
  //       >
  //         <div>
  //           <b>{data.title}</b>
  //         </div>
  //         <br />
  //         <div>
  //           <b>{data.Venue}</b>
  //         </div>
  //       </Box>
  //     </>
  //   );
  // });
  const changeView = (event) => {
    let calView;

    switch (event.target.value) {
      case "month":
        calView = {
          schedule: {
            type: "month",
            startDay: 1,
            endDay: 5,
            startTime: "09:00",
            endTime: "17:00",
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
      case "week":
        calView = {
          schedule: {
            type: "week",
            startDay: 1,
            endDay: 5,
            startTime: "09:00",
            endTime: "17:00",
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
      case "day":
        calView = {
          schedule: {
            type: "day",
            startDay: 1,
            endDay: 5,
            startTime: "09:00",
            endTime: "17:00",
            timeCellStep: 60,
            timeLabelStep: 60,
          },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };

  const customWithNavButtons = () => {
    return (
      <Fragment>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <SegmentedItem value="month">Month</SegmentedItem>
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="day">Day</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
      </Fragment>
    );
  };

  return (
    <Eventcalendar
      renderHeader={customWithNavButtons}
      height={750}
      view={calView}
      dragToResize={true}
      data={myEvents}
      cssClass="md-switching-view-cont"
    />
  );
}

export default MonthlyCalender;
