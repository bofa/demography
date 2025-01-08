import { Chart as ChartJS, CategoryScale, registerables, ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';
import { Pyramid } from '../types/Region';
import RegionSelect, { Area } from './RegionSelect';
// import RegionSelect, { Area } from './RegionSelect';

const sourceToName = {
  census: 'US Census Bureau',
  scb: 'SCB',
}

ChartJS.register(CategoryScale, annotationPlugin, ...registerables);

const labels = Array(100).fill(0).map((v, i) => i);

interface Props {
  single: boolean
  selectedItem: any|null
  data?: Pyramid // { year: number, ageMen: number[], ageWoman: number[] }
  max: number
  onItemSelect: (area: Area) => void
}

export default function PopulationPyramid(props: Props) {
  // const data: { year: number, ageMen: number[], ageWoman: number[] } = {
  //   year: props.data?.year ?? 0,
  //   ageMen: props.data?.ages.map(age => age.male) ?? [],
  //   ageWoman: props.data?.ages.map(age => age.female) ?? [],
  // }

  // const [ageFrom] = useQueryParam<number>('ageFrom')
  // const [ageTo] = useQueryParam<number>('ageTo')

  // const sliceFrom = Math.floor((ageFrom ?? 0)/5)
  // const sliceTo = Math.ceil((ageTo ?? 205)/5)

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

  const men   = props.data?.male ?? []
  const women = props.data?.female ?? []

  const baseline   = men.map((_, i) => Math.min(men[i], women[i]));
  const extraMen   = baseline.map((base, i) => Math.max(0, men[i] - base))
  const extraWomen = baseline.map((base, i) => Math.max(0, women[i] - base))

  const chartData = {
    labels: labels, // .slice(sliceFrom, sliceTo),
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
      data: set.data, // .slice(sliceFrom, sliceTo)
    }))
  }

  // console.log('chartData', props.data, chartData)

  return (
    <div style={{ width: '100%', flex: 6 }}>
      <span style={{ position: 'absolute', marginLeft: 10 }}>
        <RegionSelect
          selected={props.selectedItem}
          onItemSelect={props.onItemSelect}        
        />
        <div style={{ marginLeft: 10, fontSize: 10, color: 'gray' }}>
          {/* Source: {sourceToName[props.selectedItem?.source as keyof typeof sourceToName]} */}
        </div>
      </span>
      <Bar data={chartData} options={options} />
    </div>
  )
}