import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import style from './LineChart.module.scss';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { ILineChart } from '../model/types';
import { filteredData } from '../lib/dataFilter';
import { useAppSelector } from '@renderer/app/redux/hooks';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';
import { LoadingOutlined } from '@ant-design/icons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export const ParentLineChart: React.FC<ILineChart> = ({
  title,
  mainLabelTitle,
  optionalLabelTitle,
  additionalLabel1Title,
  additionalLabel2Title,
  mainXTitle,
  mainYTitle,
  optionalYTitle,
  mainData,
  optionalData,
  additionalData1,
  additionalData2
}) => {
  const { theme } = useContext(ThemeContext);
  const [zoom, setZoom] = useState(false);

  const themeStyles = useMemo(() => themeSetter(theme, ALL_BORDERS, [0, 0, 10, 0]), [theme]);

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
    maintainAspectRatio: false,
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
        ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' },
        grid: { color: '#55555555' },
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
        ticks: { color: theme === 'dark' ? '#ffffff' : '#000000' },
        grid: { color: '#55555555' },
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
        ...(additionalData1 ? [{
          label: additionalLabel1Title,
          data: filteredData(additionalData1).outputData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y',
        }] : []),
        ...(additionalData2 ? [{
          label: additionalLabel2Title,
          data: filteredData(additionalData2).outputData,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          yAxisID: 'y',
        }] : []),
      ],
    };
  }, [mainData, optionalData, additionalData1, additionalData2, mainLabelTitle, optionalLabelTitle, additionalLabel1Title, additionalLabel2Title]);

  const zoomer = useCallback(() => {
    if (!zoom && isActive) {
      setLocalStyles(prevStyles => ({
        ...prevStyles,
        zIndex: 100,
        width: '95vw',
        height: '90vh',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }));
      setZoom(true);
    } else {
      setLocalStyles(initialLocalStyles);
      setZoom(false);
    }
  }, [zoom, isActive, initialLocalStyles]);

  return (
    <div onClick={zoomer} style={localStyles} className={style.LineChart}>
      {isActive ? <Line options={options} data={chartData} /> : <LoadingOutlined className={style.loader} />}
    </div>
  );
};

export const MemoizedParentLineChart = React.memo(ParentLineChart);