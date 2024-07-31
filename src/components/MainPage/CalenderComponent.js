import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import axios from "axios";
import Calendar from "react-calendar";
import "../../styles/Calender.css";
import moment from "moment";
import styled from "styled-components";
import CheckImg from "../../imgs/CheckPoint.svg";

// ToDo: 과소비 건수 확인하는 박스 부분부터 시작

const CalenderWrapper = styled.div`
  height: 630px;
  background-color: #f2f6f4;
  border-radius: 20px;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const CheckPoint = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 20px;
  margin-top: -15px;
`;

const DetailBT = styled.button`
  font-family: "SUITLight";
  font-size: 10px;
  width: 100%;
  height: 34px;
  border: none;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #ff4d4d;
  cursor: pointer;
  text-decoration: none;
`;

function Calender() {
  const today = new Date();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendDay, setAttendDay] = useState(null);
  const [formatDay, setFormatDay] = useState(null);
  const userToken = useRecoilValue(tokenState);
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
  }, []);
  const [data, setData] = useState(0);
  const handleDateChange = (e) => {
    setFormatDay(moment(e).format("DD"));
    setSelectedDate(moment(e).format("YYYY-MM-DD"));
    // const foundDate = attendDay.find(
    //   (itm) => itm.date === moment(e).format("YYYY-MM-DD")
    // );
    // setData(foundDate ? foundDate.count : 0);
    const apiDate = moment(e).format("YYYY-MM-DD");
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/records/daily/${apiDate}/summary`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const totalOverConsumptionCount = response.data
          .totalOverConsumptionCount
          ? response.data.totalOverConsumptionCount
          : 0;
        setData(totalOverConsumptionCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDetailClick = () => {
    console.log("Navigating with date:", selectedDate);
    const detailDate = moment(selectedDate).format("YYYY-MM-DD");
    navigate("/ssobbi/calender", {
      state: { detailDate: detailDate },
    });
  };
  return (
    <CalenderWrapper>
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
        tileDisabled={({ date, view }) =>
          view === "month" &&
          (date > today ||
            !attendDay?.includes(moment(date).format("YYYY-MM-DD")))
        }
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
      {selectedDate && (
        <>
          <SSOBBIBox>
            <CheckPoint src={CheckImg} />
            <p>
              아이코! {formatDay}일에{" "}
              <span style={{ fontWeight: "bold" }}>{data}번</span> 과소비
              했어요.
            </p>
            <DetailBT onClick={handleDetailClick}>소비 내역 확인하기</DetailBT>
          </SSOBBIBox>
        </>
      )}
    </CalenderWrapper>
  );
}

export default Calender;
