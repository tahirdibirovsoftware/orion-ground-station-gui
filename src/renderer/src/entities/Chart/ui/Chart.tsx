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
    <div className={zoom ? style.overlay : ' '} style={{ background: theme === 'dark' ? themeConfig.darkColor : themeConfig.lightColor }}>
      <div onClick={() => { setZoom(!zoom) }} className={[`${style.Chart} `, zoom ? `${style.ZoomChart}` : ''].join(' ')} style={{ backgroundColor: theme === 'dark' ? themeConfig.darkColor : themeConfig.lightColor, border: `1px solid ${theme === 'dark' ? themeConfig.lightWidgetBorder : themeConfig.darkWidgetBorder}` }}>
        {/* @ts-ignore */}
        <Line onClick={(event) => event.stopPropagation()} options={options} data={data} />
      </div>
    </div>
  )
}
