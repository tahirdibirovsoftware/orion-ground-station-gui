import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider';
import style from './Chart.module.scss'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // Explicitly specifying the type as 'top'
    },
    title: {
      display: true,
      text: 'Monthly Average Temperature',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const temperatureData = [0, 2, 5, 10, 15, 20, 22];  // Example temperature data

export const data = {
  labels,
  datasets: [
    {
      label: 'Temperature (°C)',
      data: temperatureData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export function Chart():JSX.Element {

  const theme = useContext(ThemeContext)

  return (
    <div className={style.Chart} style={{border: `1px solid ${theme==='dark'? 'white': 'black'}`}}>
      <Line options={options} data={data} />;
    </div>
  )
}
