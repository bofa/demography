import { Chart as ChartJS, CategoryScale, registerables, ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';
import RegionSelect, { Area } from './RegionSelect';

ChartJS.register(CategoryScale, annotationPlugin, ...registerables);

const labels = Array(100/5).fill(0).map((v, i) => [5*i, 5*(i+1) - 1].join('-')).concat('100+');

interface Props {
  selectedItem: Area|null,
  data?: { year: number, ageMen: number[], ageWoman: number[] },
  max: number,
  onItemSelect: (c: Area) => void;
}

export default function Pyramid(props: Props) {
  const { data } = props;

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        stacked: true,
        reverse: true,
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
        // align: 'end',
        labels: {
          filter: (item: any) => !item.text.includes('remove')
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
    labels,
    datasets: [
      {
        label: 'Men',
        data: baseline.map(v => -v),
        backgroundColor: 'blue',
      },
      {
        label: 'removeMen',
        data: extraMen.map(v => -v),
        backgroundColor: 'darkblue',
      },
      {
        label: 'Women',
        data: baseline.map(v => v),
        backgroundColor: 'red',
      },
      {
        label: 'removeWomen',
        data: extraWomen.map(v => v),
        backgroundColor: 'darkred',
      }
    ]
  };

  return (
    <div style={{ flex: 6, height: 500 }}>
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