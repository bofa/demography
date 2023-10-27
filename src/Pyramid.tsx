import { Chart as ChartJS, CategoryScale, registerables, ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';
import RegionSelect, { Area } from './RegionSelect';
import { useQueryParam } from 'use-query-params';

ChartJS.register(CategoryScale, annotationPlugin, ...registerables);

const labels = Array(100/5).fill(0).map((v, i) => [5*i, 5*(i+1) - 1].join('-')).concat('100+');

interface Props {
  single: boolean
  selectedItem: Area|null
  data?: { year: number, ageMen: number[], ageWoman: number[] }
  max: number
  onItemSelect: (c: Area) => void
}

export default function Pyramid(props: Props) {
  const { data } = props

  const [ageFrom] = useQueryParam<number>('ageFrom')
  const [ageTo] = useQueryParam<number>('ageTo')

  const sliceFrom = Math.floor((ageFrom ?? 0)/5)
  const sliceTo = Math.ceil((ageTo ?? 200)/5)

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        stacked: true,
        reverse: true,
        position: 'right'
      },
      x: {
        stacked: true,
        suggestedMax: props.max,
        suggestedMin: -props.max,
      }
    },
    plugins: {
      legend: {
        // TODO
        position: 'bottom',
        // align: 'end',
        labels: {
          filter: (item: any) => !item.text.includes('Excess ')
        }
      },
      tooltip: {
        callbacks: {
          label: context => context.dataset.label + ': ' + Math.round(Math.abs(context.raw as number)).toLocaleString()
        }
      }
    }
  };

  const men   = data?.ageMen ?? [];
  const women = data?.ageWoman ?? [];

  const baseline   = men.map((_, i) => Math.min(men[i], women[i]));
  const extraMen   = baseline.map((base, i) => Math.max(0, men[i] - base))
  const extraWomen = baseline.map((base, i) => Math.max(0, women[i] - base))

  const chartData = {
    labels: labels.slice(sliceFrom, sliceTo),
    datasets: [
      {
        label: 'Men',
        data: baseline.map(v => -v),
        backgroundColor: 'blue',
      },
      {
        label: 'Excess Men',
        data: extraMen.map(v => -v),
        backgroundColor: 'darkblue',
      },
      {
        label: 'Women',
        data: baseline.map(v => v),
        backgroundColor: 'red',
      },
      {
        label: 'Excess Women',
        data: extraWomen.map(v => v),
        backgroundColor: 'darkred',
      }
    ]
    // Filter on query range
    .map(set => ({
      ...set,
      data: set.data.slice(sliceFrom, sliceTo)
    }))
  };

  return (
    <div style={{ flex: 6 }}>
      <div style={{ position: 'absolute' }}>
        <RegionSelect
          selectedId={props.selectedItem}
          onItemSelect={props.onItemSelect}        
        />
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}