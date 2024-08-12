import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import style from './LineChart.module.scss';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { ILineChart } from '../model/types';
import { filteredData } from '../lib/dataFilter';
import { useAppSelector } from '@renderer/app/redux/hooks';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ParentLineChart: React.FC<ILineChart> = ({
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

  const themeStyles = useMemo(() => themeSetter(theme), [theme]);

  const initialLocalStyles = useMemo(() => ({
    ...themeStyles,
    transition: 'all 0.3s ease-in-out',
  }), [themeStyles]);

  const [localStyles, setLocalStyles] = useState(initialLocalStyles);

  useEffect(() => {
    setLocalStyles(prevStyles => ({
      ...prevStyles,
      ...themeStyles,
    }));
  }, [themeStyles]);

  const flightData = useAppSelector(state => state.flightDataStoreReducer);
  const isActive = flightData[flightData.length - 1]?.packetNumber > 0;

  const yTitle = useCallback((): string | undefined => {
    if (optionalYTitle) return `${mainYTitle} / ${optionalYTitle}`;
    else return mainYTitle;
  }, [mainYTitle, optionalYTitle]);

  const options: ChartOptions<'line'> = useMemo(() => ({
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
        ticks: { color: themeStyles.color },
        grid: { color: themeStyles.color },
        title: {
          display: true,
          text: mainXTitle,
          color: themeStyles.color,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: { color: themeStyles.color },
        grid: { color: themeStyles.color },
        title: {
          display: true,
          text: yTitle(),
          color: themeStyles.color,
          font: { size: 10 },
          align: 'start' as const,
        },
      },
    },
  }), [title, mainXTitle, yTitle, themeStyles.color]);

  const chartData: ChartData<'line'> = useMemo(() => {
    const labels = filteredData(mainData)?.time;
    return {
      labels,
      datasets: [
        {
          label: mainLabelTitle,
          data: mainData ? filteredData(mainData).outputData : [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        ...(optionalData ? [{
          label: optionalLabelTitle,
          data: filteredData(optionalData).outputData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y',
        }] : []),
      ],
    };
  }, [mainData, optionalData, mainLabelTitle, optionalLabelTitle]);

  const zoomer = useCallback(() => {
    if (!zoom && isActive) {
      setLocalStyles(prevStyles => ({
        ...prevStyles,
        zIndex: 100,
        width: '60vw',
        height: '80vh',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }));
      setZoom(true);
    } else {
      setLocalStyles(initialLocalStyles);
      setZoom(false);
    }
  }, [zoom, isActive, initialLocalStyles]);

  return (
    <div onClick={zoomer} style={localStyles} className={style.LineChart}>
      {isActive && <Line options={options} data={chartData} />}
    </div>
  );
};

export const MemoizedParentLineChart = React.memo(ParentLineChart);