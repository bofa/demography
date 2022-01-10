import { Chart as ChartJS, CategoryScale, registerables, ChartData } from 'chart.js'
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
  // const labels = props.data?.map(d => d.year);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        stacked: true,
      },
      x: {
        stacked: false,
        suggestedMax: props.max,
        suggestedMin: -props.max,
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Men',
        data: props.data?.ageMen.map(v => -v).reverse(),
        backgroundColor: 'red',
      },
      {
        label: 'Women',
        data: props.data?.ageWoman.map(v => v).reverse(),
        backgroundColor: 'blue',
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
      <Bar data={data} options={options} />
    </div>
  );
}