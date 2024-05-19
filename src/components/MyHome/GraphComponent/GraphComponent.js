import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"


function GraphComponent({ data }) {
  return <Line data={data} height={200}/>
}

export default GraphComponent