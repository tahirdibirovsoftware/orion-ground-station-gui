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
import { FC, useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IChart } from '../model/types';





ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const Chart: FC<IChart> = ({ type }): JSX.Element => {

  const [theme] = useContext(ThemeContext)


  const defineMode = (): unknown => {
    switch (type) {
      case 'temperature':
        return 'T/t';
      case 'pressure':
        return 'P/t';
      case 'voltage':
        return 'V/t'
      default:
        return 'T/t'
    }
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Explicitly specifying the type as 'top'
      },
      title: {
        display: true,
        text: defineMode(),
      },
    },
  };

  const labels = [0, 2, 5, 10, 15, 20, 22];

  const temperatureData = [0, 2, 5, 10, 15, 20, 22];  // Example temperature data

  const data = {
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

  const [zoom, setZoom] = useState(false)


  return (
    <div style={{ backgroundColor: theme === 'dark' ? 'black' : 'white' }} className={zoom ? style.overlay : ''}>
      <div onClick={() => setZoom(!zoom)} className={`${style.Chart} ${zoom && style.ZoomChart}`} style={{ border: `1px solid ${theme === 'dark' ? 'rgb(30,30,30)' : 'rgb(100,100,100)'}` }}>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
