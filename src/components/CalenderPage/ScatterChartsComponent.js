// ScatterChartsComponent.jsx

import React from "react";
import Chart from "react-apexcharts";

const scatterData = [
  [2, 44, "음식"],
  [21, 58, "음식"],
  [16, 100, "패션"],
  [10, 20, "교통비"],
  [25, 2, "기타"],
  [50, 11, "패션"],
  [45, 70, "쇼핑"],
  [49, 90, "음식"],
  [62, 29, "패션"],
  [66, 45, "쇼핑"],
  [55, 10, "기타"],
  [59, 35, "패션"],
  [99, 90, "쇼핑"],
];
const ScatterChartsComponent = () => {
  const lowHappiness = scatterData.filter((point) => point[0] <= 40);
  const mediumHappiness = scatterData.filter(
    (point) => point[0] > 40 && point[0] <= 70
  );
  const highHappiness = scatterData.filter((point) => point[0] > 70);
  const options = {
    series: [
      {
        name: "낮은 행복",
        data: lowHappiness.map((point) => ({
          x: point[0],
          y: point[1],
          title: point[2],
        })),
        color: "#8FFFC2",
      },
      {
        name: "보통 행복",
        data: mediumHappiness.map((point) => ({
          x: point[0],
          y: point[1],
          title: point[2],
        })),
        color: "#3FC87E",
      },
      {
        name: "높은 행복",
        data: highHappiness.map((point) => ({
          x: point[0],
          y: point[1],
          title: point[2],
        })),
        color: "#19844A",
      },
    ],
    chart: {
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      tickAmount: 10,
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      tickAmount: 5,
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="scatter"
        width={1000}
        height={200}
      />
    </div>
  );
};

export default ScatterChartsComponent;
