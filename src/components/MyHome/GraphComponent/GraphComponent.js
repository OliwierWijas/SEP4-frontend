import { Line } from 'react-chartjs-2';


function GraphComponent({ data }) {
  return <Line data={data} height={200}/>
}

export default GraphComponent