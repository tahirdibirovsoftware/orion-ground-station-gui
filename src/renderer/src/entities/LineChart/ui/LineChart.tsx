import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import style from './LineChart.module.scss';
import { Line } from 'react-chartjs-2';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { FC, useContext } from 'react';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { ILineChart } from '../model/types';
import { filteredData } from '../lib/dataFilter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ParentLineChart: FC<ILineChart> = ({ title, mainLabelTitle, optionalLabelTitle, mainXTitle, mainYTitle, optionalYTitle, mainData, optionalData }): JSX.Element => {
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: optionalLabelTitle,
        data: optionalData && filteredData(optionalData).outputData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };

  return (
    <div style={themeSetter(theme)} className={style.LineChart}>
      <Line options={options} data={data} />
    </div>
  );
};

export { ParentLineChart };
