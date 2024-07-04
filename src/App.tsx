/* eslint-disable no-restricted-globals */
import { max, min } from 'mathjs'
import axios from 'axios'
import { useQueries } from '@tanstack/react-query'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Checkbox, MultiSlider, Slider } from '@blueprintjs/core'
import { useQueryParam } from 'use-query-params'
import Pyramid from './Pyramid'
import HistoryChart from './HistoryChart'
import { Area, items, randomArea } from './RegionSelect'
import './App.css'

type Demography = { year: number, ageMen: number[], ageWoman: number[] }
type Country = {
  code: string
  name: string
  filename: string
  data: Demography[]
}

function App() {
  const [year, setYear] = useState(new Date().getFullYear() - 1)
  const [hideHistory] = useQueryParam<boolean>('hideHistory')

  const [countryId1, selectCountryId1] = useQueryParam<string>('countryId1')
  const country1 = items.find(area => area.name === countryId1)
  
  const [countryId2, selectCountryId2] = useState<Area|null>(null)
  const [ranges, setRanges] = useState<number[]>([20, 65])
  const [useProcent, setProcent] = useState(false)

  useEffect(() => {
    const onChange = (event: any) => {
      location.reload()
    }

    screen.orientation.addEventListener("change", onChange)

    return () => {
      screen.orientation.removeEventListener('change', onChange)
    }
  })

  const size = useWindowSize()

  const countryQueries = useQueries({
    queries: [country1, countryId2].map(countryId => ({
      queryKey: ['demographics', countryId],
      queryFn: () => countryId
        ? axios(countryId.source + '/area' + countryId.code + '.json').then(response => response.data as Country)
        : Promise.resolve(null),
      staleTime: Infinity
    }))
  })

  const countryData1 = countryQueries[0].data?.data
  const countryData2 = countryQueries[1].data?.data

  const totalPop1 = countryData1?.map(y => ({
    year: y.year,
    pop: y.ageMen.map((v, i) => v + y.ageWoman[i])
  }));

  const totalPop2 = countryData2?.map(y => ({
    year: y.year,
    pop: y.ageMen.map((v, i) => v + y.ageWoman[i])
  }));

  const sum1 = [
    totalPop1?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i < ranges[0]).reduce((sum, value) => sum + value, 0) })),
    totalPop1?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[0] && 5*i < ranges[1]).reduce((sum, value) => sum + value, 0) })),
    totalPop1?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[1]).reduce((sum, value) => sum + value, 0) })),
  ];

  const sum2 = [
    totalPop2?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i < ranges[0]).reduce((sum, value) => sum + value, 0) })),
    totalPop2?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[0] && 5*i < ranges[1]).reduce((sum, value) => sum + value, 0) })),
    totalPop2?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[1]).reduce((sum, value) => sum + value, 0) })),
  ];

  const historyLabels = [
    '<' + ranges[0],
    '[' + ranges[0] + ',' + (ranges[1] - 1) + ']',
    '>' + (ranges[1] - 1),
  ]

  // // Debug test all codes
  // useEffect(() => {
  //   // TODO Check for duplicates
  //   const duplicates = countries
  //     .map(fip => fip.FIPS).filter((fip, index, array) => array.indexOf(fip) !== index)
  //   console.log('duplicates', duplicates)

  //   // countries.forEach((fip, index) => {
  //   //   // console.log('fip?', fip.name)
  //   //   getForYear(fip.FIPS, 2023).catch(error => console.log('No Data', fip.name))
  //   // })
  // }, [])

  const single = size[0] < 700

  useEffect(() => {
    if(!countryId1) {
      selectCountryId1(randomArea().name)
    }
  }, [])

  useEffect(() => {
    if(!single) {
      selectCountryId2(randomArea())
    }
  }, [single])

  const data1 = countryData1?.find(d => d.year === year);
  const data2 = countryData2?.find(d => d.year === year);

  const maxAge1 = Math.max(...(countryData1?.map(d => d.ageMen.concat(d.ageWoman)).slice(hideHistory ? -1 : undefined).flat().filter(v => v) || []))
  const maxAge2 = Math.max(...(countryData2?.map(d => d.ageMen.concat(d.ageWoman)).slice(hideHistory ? -1 : undefined).flat().filter(v => v) || []))

  // Calculate key numbers
  // if (data1?.ageMen) {
  //   const mergeSexes = data1.ageMen.map((m, i) => m + data1.ageWoman[i]);
  //   const mean = mergeSexes.reduce((sum, v, i) => sum + i*v, 0) / mergeSexes.reduce((sum, v, i) => sum + v, 0)
    
  //   const menTotal = data1.ageMen.reduce((s, v) => s+v);
  //   const womanTotal = data1.ageWoman.reduce((s, v) => s+v);
  //   const diffSexes = (menTotal-womanTotal)/(menTotal+womanTotal);

  //   const menTotal10 = data1.ageMen.slice(0, 2).reduce((s, v) => s+v);
  //   const womanTotal10 = data1.ageWoman.slice(0, 2).reduce((s, v) => s+v);
  //   const diffSexes10 = (menTotal10-womanTotal10)/(menTotal10+womanTotal10);
    
  //   console.log(
  //     'Mean Age', Math.round(5 * mean),
  //     'Surplus Men[%]', Math.round(1000*diffSexes) / 10,
  //     'Surplus Men <11[%]', Math.round(1000*diffSexes10) / 10
  //   );
  // }

  // '10px 0px 0px 0px'

  const years = countryData1?.concat(countryData2 ?? [])
    .filter(year => year.ageMen[0])
    .map(year => year.year).filter(year => year) ?? [0]
  const maxYear = max(years)
  const minYear = min(years)

  return (
    <div key={size + size.join(',')} style={{ padding: 15, paddingRight: 30, height: window.innerHeight, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: hideHistory ? '100%' : '50%', marginBottom: 20, display: 'flex' }}>
        <Pyramid
          single={single}
          selectedItem={country1!}
          data={data1}
          max={maxAge1}
          onItemSelect={area => selectCountryId1(area.name)}
        />
        <div style={{ padding: '0px 0px 60px 10px' }}>
          <Slider
            vertical
            className="slider-vertical"
            value={year}
            min={minYear}
            max={maxYear}
            onChange={year => setYear(year)}
            labelStepSize={10}
          />
        </div>
        {!single && <Pyramid
          single={single}
          selectedItem={countryId2}
          data={data2}
          max={maxAge2}
          onItemSelect={area => selectCountryId2(area)}
        />}
      </div>

      {!hideHistory &&
        <div style={{ height: '50%', display: 'flex' }}>
          <HistoryChart useProcent={useProcent} year={year} data={sum1} labels={historyLabels}/>
          <div style={{ padding: '0px 20px 30px 10px', display: 'flex', flexDirection: 'column' }}>
            <Checkbox checked={useProcent} onChange={() => setProcent(!useProcent)}>%</Checkbox>
            <div style={{ height: '100%' }}>
              <MultiSlider
                vertical
                className="slider-vertical"
                min={0}
                max={100}
                onChange={setRanges}
                labelStepSize={5}
                stepSize={5}
              >
                <MultiSlider.Handle value={ranges[0]} interactionKind="push" type="start" intentBefore="warning" intentAfter="primary"/>
                <MultiSlider.Handle value={ranges[1]} interactionKind="push" type="end" intentAfter="success"/>
              </MultiSlider>
            </div>
          </div>
          {!single && <HistoryChart useProcent={useProcent} year={year} data={sum2} labels={historyLabels}/>}
        </div>
      }
    </div>
  );
}

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       cacheTime: 1000 * 60 * 60 * 24 * 30
//     },
//   },
// })

// const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })
// // const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

// persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
// })

export default App;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}