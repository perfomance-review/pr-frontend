import React from 'react';
import ReactECharts from 'echarts-for-react';

const Diagram = (props) => {
  const option = {
    title: {
      text: '',
    },
    tooltip: {},
    legend: {
      data: ['Результаты оценки'],
    },
    radar: {
      indicator: Object.entries(props.result).map((item) => ({
        name: item[0],
        max: 10,
      })),
    },
    series: [
      {
        name: 'Результаты оценки',
        type: 'radar',
        data: [
          {
            value: Object.entries(props.result).map((item) => item[1]),
            name: 'Результаты оценки',
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export { Diagram };
