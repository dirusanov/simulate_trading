import React from "react";

import Title from "./Title";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";

const ChartObject = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};
const color = ChartObject.helpers.color;
const data = {
  datasets: [
    {
      label: "trading result",
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.red,
      fill: false,
      lineTension: 0,
      borderDash: [8, 4],
      data: [],
    },
  ],
};

const options = (value) => ({
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    xAxes: [
      {
        type: "realtime",
        distribution: "linear",
        realtime: {
          onRefresh: function (chart) {
            chart.data.datasets[0].data.push({
              x: moment(),
              y: value,
            });
          },
          delay: 1000,
        },
        ticks: {
          displayFormats: 1,
          maxRotation: 0,
          minRotation: 0,
          stepSize: 20,
          maxTicksLimit: 60,
          minUnit: "second",
          source: "auto",
          autoSkip: true,
          callback: function (value) {
            return moment(value, "HH:mm:ss").format("hh:mm:ss");
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: value + 20,
        },
      },
    ],
  },
});

export default function Chart(props) {
  return (
    <React.Fragment>
      <Title>Trading session</Title>
      <Line data={data} options={options(props.amount)} />
    </React.Fragment>
  );
}
