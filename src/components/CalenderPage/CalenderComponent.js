/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import axios from "axios";
import Calendar from "react-calendar";
import "../../styles/Calender.css";
import moment from "moment";
import styled from "styled-components";

const StyledDot = styled.div`
  background-color: #2aa663;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledToday = styled.div`
  background-color: #3fc87e;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
`;

function CalenderComponent({ onMonthChange, setApiMonth }) {
  const userToken = useRecoilValue(tokenState);

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendDay, setAttendDay] = useState(null);
  useEffect(() => {
    const selectedMonth = selectedDate
      ? moment(selectedDate).format("YYYY-MM")
      : moment().format("YYYY-MM");
    const fetchData = async () => {
      try {
        const records = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/monthly/${selectedMonth}/recorded-dates`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setAttendDay(records.data.recordedDates);
        console.log("setAttendDay: ", records.data.recordedDates);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [data, setData] = useState(null);

  const handleDateChange = (e) => {
    const selectedDate = moment(e);
    attendDay.map((itm) =>
      itm.date === moment(e).format("YYYY-MM-DD")
        ? setData(itm.category)
        : setData("")
    );
    const month = selectedDate.format("M");
    onMonthChange(month);
    setApiMonth(moment(e).format("YYYY-MM-DD"));
  };
  return (
    <div>
      <Calendar
        className="react-calendar-2"
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileDisabled={({ date, view }) => view === "month" && date > today}
        tileContent={({ date, view }) => {
          let html = [];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          if (
            attendDay &&
            attendDay.includes(moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
          }
          return <>{html}</>;
        }}
      />
    </div>
  );
}

export default CalenderComponent;
