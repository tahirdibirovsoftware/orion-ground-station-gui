/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { themeConfig } from '@renderer/shared/model';





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


  const defineMode = (): {text: string, label: string} => {
    switch (type) {
      case 'temperature':
        return {text: 'T/t', label: 'Temperature'};
      case 'pressure':
        return {text:'P/t', label: 'Pressure'};
      case 'voltage':
        return {text:'V/t', label: 'Voltage'};
      case 'descentRate':
        return {text: 'm/s', label: 'Descent Rate'};
      default:
        return {text:'', label: ''}
    }
  }



  const options = {
    responsive: true,
    maintainAspectRatio: true,
  aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top' as const, // Explicitly specifying the type as 'top'
      },
      title: {
        display: true,
        text: defineMode().text,
      },
    },
    scales: {
      x: {
        grid: {
          color: theme==='dark' ? 'white' : 'black' // Set x-axis grid lines to white
        },
        ticks: {
          color: theme==='dark' ? 'white' : 'black' // Set x-axis ticks to white
        }
      },
      y: {
        grid: {
          color: theme==='dark' ? 'white' : 'black', // Set y-axis grid lines to white
        },
        ticks: {
          color: theme==='dark' ? 'white' : 'black' // Set y-axis ticks to white
        }
      }
    }
  };
  


  const labels = [0, 2, 5, 10, 15, 20, 22];

  const temperatureData = [0, 2, 5, 10, 15, 20, 22];  // Example temperature data

  const data = {
    labels,
    datasets: [
      {
        label: defineMode().label,
        data: temperatureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const [zoom, setZoom] = useState(false)


  return (
    <div className={zoom ? style.overlay : ' '} style={{ background: theme === 'dark' ? themeConfig.darkColor : themeConfig.lightColor }}>
      <div onClick={() => { setZoom(!zoom) }} className={[`${style.Chart} `, zoom ? `${style.ZoomChart}` : ''].join(' ')} style={{ backgroundColor: theme === 'dark' ? themeConfig.darkColor : themeConfig.lightColor, border: `1px solid ${theme === 'dark' ? themeConfig.lightWidgetBorder : themeConfig.darkWidgetBorder}` }}>
        {/* @ts-ignore */}
        <Line onClick={(event) => event.stopPropagation()} options={options} data={data} />
      </div>
    </div>
  )
}
