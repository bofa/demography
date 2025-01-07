import { Checkbox, Colors, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { Line } from "react-chartjs-2";

function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

interface Props {
  year: number
  labels: string[]
  useProcent: boolean
  data: ({
    year: number
    sum: number
  }[] | undefined)[]
}

export default function HistoryChart(props: Props) {
  const { useProcent } = props
  // const labels = ['Age Range 1', 'Age Range 2', 'Age Range 3']
  const colors = [Colors.ORANGE3, Colors.BLUE3, Colors.GREEN3].map(c => addAlpha(c, 0.6));

  const options = {
    animation: {
      duration: 0,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear' as const,
        ticks: {
          callback: (arg1: any, arg2: any) => arg1
        }
      },
      y: {
        stacked: true,
        min: 0,
        max: useProcent ? 100 : undefined, 
      }
    },
    plugins: {
      legend: true,
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: props.year,
            xMax: props.year,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      }
    }
  } as any;

  let data = props.data;
  if (useProcent) {
    const totalPopulation = props.data[0]?.map((y, i) => props.data.reduce((sum, value) => {
      if (value) {
        return sum + value?.[i]?.sum;
      }

      return sum;
    }, 0)) as number[];

    data = props.data.map(ageGroup => ageGroup?.map((year, index) => ({ year: year.year, sum: 100 * year.sum / totalPopulation[index] })))
  }

  const datasets = {
    datasets: data.map((range, i) => ({
      label: props.labels[i],
      data: range?.map(y => ({ x: y.year, y: y.sum })).filter(y => y.y),
      fill: i-1 > -1 ? i-1 : 'origin',
      backgroundColor: colors[i],
    })),
  }

  return (
    <div style={{ width: '100%' }}>
      <Line data={datasets} options={options}/>
    </div>
  );
}