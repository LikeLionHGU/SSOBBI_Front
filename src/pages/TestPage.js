import { Link } from "react-router-dom";

import DayStatisticsComponent from "../components/TestPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../components/TestPage/WeekMonthStstisticsComponent";

const dayData = {
  happy: 74,
  cost: 250,
};

function TestPage() {
  return (
    <>
      <Link to="/create">
        <button>오늘의 소비 입력</button>
      </Link>
      <DayStatisticsComponent happy={dayData.happy} />
      <WeekMonthStstisticsComponent />
    </>
  );
}

export default TestPage;
