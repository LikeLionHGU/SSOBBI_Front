import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/Calender.css";
import moment from "moment";
import styled from "styled-components";

// ToDo: 과소비 건수 확인하는 박스 부분부터 시작
const StyledDot = styled.div`
  background-color: blue;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledToday = styled.div`
  font-size: x-small;
  color: red;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

const SSOBBIBox = styled.div`
  width: 232px;
  height: 85px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "SUITLight";
  font-size: 14px;
  margin-top: 50px;
  text-align: center;
  background-color: #f6f6fc;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DetailBT = styled.div`
  font-family: "SUITLight";
  font-size: 10px;
  width: 100%;
  height: 34px;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #ff4d4d;
  margin-top: 15px;
  cursor: pointer;
`;

function Calender() {
  const today = new Date();
  const attendDay = [
    {
      date: "2024-07-02",
      emotion: "슬픔",
      category: "식비",
      count: 2,
    },
    {
      date: "2024-07-19",
      emotion: "기쁨",
      category: "교통비",
      count: 5,
    },
  ];
  const [selectedDate, setSelectedDate] = useState(null);
  // const [attendDay, setAttendDay] = useState(null);
  const [data, setData] = useState(0);
  const handleDateChange = (e) => {
    const formattedDate = moment(e).format("DD");
    setSelectedDate(formattedDate);
    const foundDate = attendDay.find(
      (itm) => itm.date === moment(e).format("YYYY-MM-DD")
    );
    setData(foundDate ? foundDate.count : 0);
  };
  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
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
            attendDay.find((x) => x.date === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
          }
          return <>{html}</>;
        }}
      />
      {selectedDate && (
        <>
          <SSOBBIBox>
            <p>
              아이코! {selectedDate}일에{" "}
              <span style={{ fontWeight: "bold" }}>{data}번</span> 과소비
              했어요.
            </p>
            <DetailBT>소비 내역 확인하기</DetailBT>
          </SSOBBIBox>
        </>
      )}
    </div>
  );
}

export default Calender;
