import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Days = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className="min-h-screen">
        <div className="my-16 mx-auto flex items-center justify-center w-full">
          <Calendar onChange={onChange} value={value} calendarType="US" />
        </div>
      </div>
    </>
  );
};

export default Days;
