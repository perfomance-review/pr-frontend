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
      indicator: props.result.map((item) => ({
        name: item.textCompetence,
        max: 10,
      })),
    },
    series: [
      {
        name: 'Результаты оценки',
        type: 'radar',
        data: [
          {
            value: props.result.map((item) => item.score),
            name: 'Результаты оценки',
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export { Diagram };
