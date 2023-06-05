import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Page } from "@mobiscroll/react";
import MonthlyCalender from "./components/MonthlyCalender";
// same code added
function App() {
  return (
    <Page>
      <MonthlyCalender />
    </Page>
  );
}

export default App;
