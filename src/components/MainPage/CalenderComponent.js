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
import Check0Img from "../../imgs/alarmCheck0.png";

// ToDo: 과소비 건수 확인하는 박스 부분부터 시작

const CalenderWrapper = styled.div`
  height: 630px;
  background-color: #f2f6f4;
  border-radius: 20px;
  margin-top: 35px;
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
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CheckPoint = styled.img`
  width: 25px;
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
  background-color: ${(props) => (props.data === 0 ? "#19844A" : "#ff4d4d")};
  cursor: pointer;
  text-decoration: none;
`;

function Calender({ setApiDate }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, setSelectedDate]);
  const [data, setData] = useState(0);
  const handleDateChange = (e) => {
    setFormatDay(moment(e).format("DD"));
    setSelectedDate(moment(e).format("YYYY-MM-DD"));
    setApiDate(moment(e).format("YYYY-MM-DD"));
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
        const totalOverConsumptionCount =
          response.data.totalOverConsumptionCount !== undefined &&
          response.data.totalOverConsumptionCount !== null
            ? response.data.totalOverConsumptionCount
            : null;
        setData(totalOverConsumptionCount);
        // console.log(
        //   "totalOverConsumptionCount확인 : ",
        //   response.data.totalOverConsumptionCount
        // );
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
  const handleActiveStartDateChange = ({ activeStartDate, action }) => {
    let newDate;
    if (action === "prev") {
      newDate = new Date(
        activeStartDate.getFullYear(),
        activeStartDate.getMonth() + 1,
        0
      );
    } else if (action === "next") {
      newDate = new Date(
        activeStartDate.getFullYear(),
        activeStartDate.getMonth(),
        1
      );
    }
    handleDateChange(newDate);
  };
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 오늘이 속한 달의 마지막 날

  return (
    <CalenderWrapper>
      <Calendar
        onChange={handleDateChange}
        onActiveStartDateChange={(e) =>
          handleActiveStartDateChange({ ...e, action: e.action })
        }
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        maxDate={maxDate}
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
      {selectedDate && data !== null && (
        <>
          <SSOBBIBox>
            {data === 0 ? (
              <>
                <CheckPoint src={Check0Img} />
                <p>
                  나이스! {formatDay}일에{" "}
                  <span style={{ fontWeight: "bold" }}>{data}번</span>{" "}
                  과소비했어요.
                </p>
              </>
            ) : (
              <>
                <CheckPoint src={CheckImg} />
                <p>
                  아이코! {formatDay}일에{" "}
                  <span style={{ fontWeight: "bold" }}>{data}번</span>{" "}
                  과소비했어요.
                </p>
              </>
            )}

            <DetailBT onClick={handleDetailClick} data={data}>
              소비 내역 확인하기
            </DetailBT>
          </SSOBBIBox>
        </>
      )}
    </CalenderWrapper>
  );
}

export default Calender;
