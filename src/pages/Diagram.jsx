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
        { name: 'Профессионализм', max: 10 },
        { name: 'Вовлеченность', max: 10 },
        { name: 'Ответственность', max: 10 },
        { name: 'Отзывчивость', max: 10 },
        { name: 'Лидерство', max: 10 },
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
