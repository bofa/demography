import { Colors, Intent } from "@blueprintjs/core";
import { Line } from "react-chartjs-2";

function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear' as const
    },
    y: {
      stacked: true,
      min: 0,
    }
  }  
}

interface Props {
  data: (number[] | undefined)[]
}

export default function HistoryChart(props: Props) {
  const labels = ['Age Range 1', 'Age Range 2', 'Age Range 3']
  const colors = [Colors.ORANGE3, Colors.BLUE3, Colors.GREEN3].map(c => addAlpha(c, 0.6));
  
  const data = {
    datasets: props.data.map((range, i) => ({
      label: labels[i],
      data: range?.map((y, x) => ({ x: 1980+x, y })),
      fill: i-1 > -1 ? i-1 : 'origin',
      backgroundColor: colors[i],
    })),
  }

  return <Line data={data} options={options}/>
}