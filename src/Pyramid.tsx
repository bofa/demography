import { Chart as ChartJS, CategoryScale, registerables } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';
import CountrySelect from './CountrySelect';
import { Country } from './fips';

ChartJS.register(CategoryScale, annotationPlugin, ...registerables);

const labels = Array(100/5).fill(0).map((v, i) => [5*i, 5*(i+1) - 1].join('-')).reverse();

interface Props {
  selectedItem?: Country,
  items: Country[],
  data?: { year: number, ageMen: number[], ageWoman: number[] },
  max: number,
  onItemSelect: (c: Country) => void;
}

export default function Pyramid(props: Props) {
  const { data } = props;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: true,
        suggestedMax: props.max,
        suggestedMin: -props.max,
      }
    },
    plugins: {
      legend: {
        labels: {
          filter: (item: any) => !item.text.includes('remove')
        }
      }
    }
  };

  const men   = data?.ageMen.map(v => v).reverse() ?? [];
  const women = data?.ageWoman.map(v => v).reverse() ?? [];

  const baseline   = men.map((_, i) => Math.min(men[i], women[i]));
  const extraMen   = baseline.map((base, i) => Math.max(0, men[i] - base))
  const extraWomen = baseline.map((base, i) => Math.max(0, women[i] - base))

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Men',
        data: baseline.map(v => -v),
        backgroundColor: 'red',
      },
      {
        label: 'removeMen',
        data: extraMen.map(v => -v),
        backgroundColor: 'darkred',
      },
      {
        label: 'Women',
        data: baseline.map(v => v),
        backgroundColor: 'blue',
      },
      {
        label: 'removeWomen',
        data: extraWomen.map(v => v),
        backgroundColor: 'darkblue',
      }
    ]
  };

  return (
    <div style={{ flex: 6, height: 500 }}>
      <div style={{ position: 'absolute' }}>
        <CountrySelect
          selectedItem={props.selectedItem}
          items={props.items}
          onItemSelect={props.onItemSelect}        
        />
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}