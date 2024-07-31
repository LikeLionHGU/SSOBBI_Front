import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calender.css";
import moment from "moment";
import styled from "styled-components";
import { format } from "date-fns";
import axios from "axios";
import { tokenState } from "../../store/atom";
import { useRecoilValue } from "recoil";

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

const CalenderWrapper = styled.div`
  height: 83vh;
  background-color: #f2f6f4;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

function Calender({ setSelectDate }) {
  const today = new Date();
  const todayDate = ("0" + today.getDate()).slice(-2);
  const [month, setMonth] = useState(moment(today).format("YYYY-MM"));
  const [attendDay, setAttendDay] = useState();
  const userToken = useRecoilValue(tokenState);
  const handleDateChange = (e) => {
    setSelectDate(moment(e).format("YYYY-MM-DD"));
  };
  const shortWeekdayFormat = (locale, date) => {
    return format(date, "EEE", { locale });
  }; // 캘린더 요일 형식 영어로 바꾸기
  function handleMonthChange({ activeStartDate }) {
    setMonth(moment(activeStartDate).format("YYYY-MM"));
  }
  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_BASE_URL +
      `/records/monthly/${month}/recorded-dates`;
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        const data = response.data.recordedDates;
        const formattedData = data.map((itm) => ({ date: itm }));
        setAttendDay(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month]);
  return (
    <CalenderWrapper>
      <Calendar
        formatShortWeekday={shortWeekdayFormat}
        onActiveStartDateChange={handleMonthChange}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("DD")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
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
            html.push(<StyledToday key={"today"}>{todayDate}</StyledToday>);
          }
          if (
            attendDay.find((x) => x.date === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
          }
          return <>{html}</>;
        }}
      />
      {/* <p>카테고리 출력 : {data}</p> */}
    </CalenderWrapper>
  );
}

export default Calender;
