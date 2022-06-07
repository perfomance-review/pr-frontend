import React from 'react';
import ReactECharts from 'echarts-for-react';

const Diagram = () => {
  const option = {
    title: {
      text: '',
    },
    tooltip: {},
    legend: {
      data: ['Результаты оценки'],
    },
    radar: {
      indicator: [
        { name: 'Автономность', max: 10 },
        { name: 'Лидерство', max: 10 },
        { name: 'Системность', max: 10 },
        { name: 'Коммуникация', max: 10 },
        { name: 'Планирование', max: 10 },
      ],
    },
    series: [
      {
        name: 'Результаты оценки',
        type: 'radar',
        data: [
          {
            value: [8, 4, 6, 8, 2],
            name: 'Результаты оценки',
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export { Diagram };
