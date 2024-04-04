import { VictoryAxis, VictoryChart, VictoryLine } from 'victory'
import graph from './Graph.module.scss'
import { FC } from 'react'

interface IGraph {
  XParameter: string
  YParameter: string
}

const Graph: FC<IGraph> = ({ XParameter, YParameter }): JSX.Element => {
  return (
    <div className={graph.container}>
     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     <div className={graph.xInfo}>{XParameter}</div>
      <VictoryChart>
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 1 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
        <VictoryAxis
          style={{
            axis: { stroke: '#756f6a' }, // Change axis lines color
            tickLabels: { fill: '#756f6a' } // Change tick labels color
          }}
          gridComponent={<line stroke="lightgray" />} // Customize grid line component
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: '#756f6a' }, // Change axis lines color
            tickLabels: { fill: '#756f6a' }, // Change tick labels color
            grid: { stroke: 'lightgray', strokeDasharray: '4,8' } // Change grid lines color and style
          }}
        />
      </VictoryChart>
     </div>
      <div className={graph.yInfo}>{YParameter}</div>
    </div>
  )
}

export default Graph
