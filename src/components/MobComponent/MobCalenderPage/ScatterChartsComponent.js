import React from "react";
import Chart from "react-apexcharts";

const ScatterChartsComponent = ({ happinessRateData }) => {
  const lowHappiness = happinessRateData?.filter(
    (point) => point.happinessLevel === "낮음"
  );
  const mediumHappiness = happinessRateData?.filter(
    (point) => point.happinessLevel === "중간"
  );
  const highHappiness = happinessRateData?.filter(
    (point) => point.happinessLevel === "높음"
  );

  const options = {
    series: [
      {
        name: "낮은 행복",
        data: lowHappiness?.map((point) => ({
          x: point.happinessRate,
          y: point.normalizationOverConsumptionAmount,
          title: point.overConsumptionCategories.join(", "),
        })),
        color: "#8FFFC2",
      },
      {
        name: "보통 행복",
        data: mediumHappiness?.map((point) => ({
          x: point.happinessRate,
          y: point.normalizationOverConsumptionAmount,
          title: point.overConsumptionCategories.join(", "),
        })),
        color: "#3FC87E",
      },
      {
        name: "높은 행복",
        data: highHappiness?.map((point) => ({
          x: point.happinessRate,
          y: point.normalizationOverConsumptionAmount,
          title: point.overConsumptionCategories.join(", "),
        })),
        color: "#19844A",
      },
    ],
    chart: {
      type: "scatter",
      zoom: {
        enabled: false,
        type: "xy",
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      tickAmount: 4,
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="scatter"
        width="300" // 차트 너비 설정
        height="150" // 차트 높이 설정
      />
    </div>
  );
};

export default ScatterChartsComponent;