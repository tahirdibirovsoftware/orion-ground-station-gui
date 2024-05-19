import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import style from './BarChart.module.scss';
import { Bar } from 'react-chartjs-2';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { FC, useContext } from 'react';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { filteredData } from '@renderer/entities/LineChart';
import { IBarChart } from '../model/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ParentBarChart: FC<IBarChart> = ({ title, mainLabelTitle, optionalLabelTitle, mainXTitle, mainYTitle, optionalYTitle, mainData, optionalData }): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  const yTitle = (): string | undefined => {
    if (optionalYTitle) return `${mainYTitle} / ${optionalYTitle}`;
    else return mainYTitle;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
        },
        title: {
          display: true,
          text: `${mainXTitle}`,
          color: 'white',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
        },
        title: {
          display: true,
          text: yTitle(),
          color: 'white',
        },
      },
    },
  };

  // Generate label data
  const labels = filteredData(mainData)?.time;

  const data = {
    labels,
    datasets: [
      {
        label: mainLabelTitle,
        data: mainData && filteredData(mainData).outputData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: optionalLabelTitle,
        data: optionalData && filteredData(optionalData).outputData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  return (
    <div style={themeSetter(theme)} className={style.BarChart}>
      <Bar options={options} data={data} />
    </div>
  );
};

export { ParentBarChart };
