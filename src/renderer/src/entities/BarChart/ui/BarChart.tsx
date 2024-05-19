import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import style from './BarChart.module.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: true,  // Important for responsive resizing
    aspectRatio: 1,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Altitude vs Time',
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white',  // Set the color of the x-axis labels
      },
      grid: {
        color: 'white',  // Set the color of the grid lines
      },
      title: {
        display: true,
        text: 'Time (s)',
        color: 'white'
      },
    },
    y: {
      ticks: {
        color: 'white',  // Set the color of the y-axis labels
      },
      grid: {
        color: 'white',  // Set the color of the grid lines
      },
      title: {
        display: true,
        text: 'Altitude (m)',
        color: 'white'
      },
    },
  },
};

const labels = ['0s', '10s', '20s', '30s', '40s', '50s', '60s'];

const generateAltitudeData = (numPoints):Array<number> => {
  return Array.from({ length: numPoints }, () => Math.floor(Math.random() * 1000));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Altitude 1',
      data: generateAltitudeData(labels.length),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Altitude 2',
      data: generateAltitudeData(labels.length),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const BarChart = ():JSX.Element=> {

    const { theme } = useContext(ThemeContext)

    return (
    <div style={themeSetter(theme)} className={style.BarChart}>
        <Bar options={options} data={data} />;
    </div>
  )
}
