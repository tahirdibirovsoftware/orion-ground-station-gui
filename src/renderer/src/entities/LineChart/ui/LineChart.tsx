import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import style from './LineChart.module.scss';
import { Line } from 'react-chartjs-2';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import React, { FC, useContext, useState } from 'react';
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
  const initialLocalStyles: React.CSSProperties = {
    ...themeSetter(theme),
    transition: 'all 0.3s ease-in-out',
  };
  const [localeStyles, setLocalStyles] = useState<React.CSSProperties>(initialLocalStyles);
  const [zoom, setZoom] = useState<boolean>(false);

  const yTitle = (): string | undefined => {
    if (optionalYTitle) return `${mainYTitle} / ${optionalYTitle}`;
    else return mainYTitle;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
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
          font: {
            size: 10,
          },
          align: 'start' as const,
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

  const zoomer = (): void => {
    if (!zoom) {
      setLocalStyles({
        ...localeStyles,
        zIndex: 3,
        width: '60vw',
        height: '80vh',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      });
      setZoom(true);
    } else {
      setLocalStyles(initialLocalStyles);
      setZoom(false);
    }
  };

  return (
    <div onClick={zoomer} style={localeStyles} className={style.LineChart}>
      <Line options={options} data={data} />
    </div>
  );
};

export { ParentLineChart };
