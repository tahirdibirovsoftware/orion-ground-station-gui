import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { filteredData } from '@renderer/entities/LineChart';
import { IBarChart } from '../model/types';
import style from './BarChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ParentBarChart: React.FC<IBarChart> = ({
  title,
  mainLabelTitle,
  optionalLabelTitle,
  mainXTitle,
  mainYTitle,
  optionalYTitle,
  mainData,
  optionalData
}) => {
  const { theme } = useContext(ThemeContext);
  const [zoom, setZoom] = useState(false);

  const initialLocalStyles = useMemo(() => ({
    ...themeSetter(theme),
    transition: 'all 0.3s ease-in-out',
  }), [theme]);

  const [localStyles, setLocalStyles] = useState(initialLocalStyles);

  const yTitle = useMemo(() => 
    optionalYTitle ? `${mainYTitle} / ${optionalYTitle}` : mainYTitle,
  [mainYTitle, optionalYTitle]);

  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'white' },
        title: {
          display: true,
          text: mainXTitle,
          color: 'white',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: { color: 'white' },
        grid: { color: 'white' },
        title: {
          display: true,
          text: yTitle,
          color: 'white',
          font: { size: 10 },
        },
      },
    },
  }), [title, mainXTitle, yTitle]);

  const chartData: ChartData<'bar'> = useMemo(() => {
    const labels = filteredData(mainData)?.time || [];
    const datasets = [
      {
        label: mainLabelTitle || 'Main Data',
        data: mainData ? filteredData(mainData).outputData : [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ];

    if (optionalData) {
      datasets.push({
        label: optionalLabelTitle || 'Optional Data',
        data: filteredData(optionalData).outputData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      });
    }

    return { labels, datasets };
  }, [mainData, optionalData, mainLabelTitle, optionalLabelTitle]);

  const zoomer = useCallback(() => {
    if (!zoom) {
      setLocalStyles({
        ...initialLocalStyles,
        zIndex: 3,
        width: '60vw',
        height: '80vh',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      });
    } else {
      setLocalStyles(initialLocalStyles);
    }
    setZoom(!zoom);
  }, [zoom, initialLocalStyles]);

  return (
    <div onClick={zoomer} style={localStyles} className={style.BarChart}>
      <Bar options={options} data={chartData} />
    </div>
  );
};