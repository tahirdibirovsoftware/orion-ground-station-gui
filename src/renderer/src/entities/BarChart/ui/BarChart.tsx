import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import style from './BarChart.module.scss';
import { Bar } from 'react-chartjs-2';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import React, { FC, useContext, useState } from 'react';
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
    <div onClick={zoomer} style={localeStyles} className={style.BarChart}>
      <Bar options={options} data={data} />
    </div>
  );
};

export { ParentBarChart };
