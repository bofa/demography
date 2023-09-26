// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { persistQueryClient } from '@tanstack/react-query-persist-client'
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { useEffect, useState } from 'react';
import { MultiSlider, Slider } from '@blueprintjs/core';
import Pyramid from './Pyramid';
import HistoryChart from './HistoryChart';
import getCountry from './api';
import './App.css';
import axios from 'axios';
import { Area, randomArea } from './RegionSelect';

const settings = {
  minYear: 1980,
  maxYear: 2050,
}

// function* rangeGen(from: number, to: number, step = 1) {
//   for (let i = from; i <= to; i += step) {
//     yield i;
//   }
// }

const range = (start: number, end: number) => Array.from({length: (end - start)}, (v, k) => k + start);

// const countries = [
//   { name: 'Sweden' },
//   { name: 'Norway' },
// ]

type Demography = { year: number, ageMen: number[], ageWoman: number[] }

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [countryId1, selectCountryId1] = useState<Area|null>(null);
  const [countryId2, selectCountryId2] = useState<Area|null>(null);
  const [countryData, setCountryData] = useState<{ [key: string]: Demography[] }>({});
  const [ranges, setRanges] = useState<number[]>([20, 65]);
  const [useProcent, setProcent] = useState(false);

  const countryData1 = countryId1 ? countryData[countryId1.key] : null;
  const countryData2 = countryId2 ? countryData[countryId2.key] : null;

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
    'Age<' + ranges[0],
    ranges[0] + '<=Age<=' + ranges[1],
    'Age>' + ranges[1],
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

  const single = window.innerWidth > 500

  useEffect(() => {
    selectCountryId1(randomArea())
  }, [])

  useEffect(() => {
    if(single) {
      selectCountryId2(randomArea())
    }
  }, [])

  useEffect(() => {
    if (countryId1 && !countryData[countryId1.key]) {
      if(countryId1.source === 'scb') {
        axios('area' + countryId1.key + '.json')
          .then(response => response.data)
          .then((data: Demography[]) => {
            const year = Math.max(...data.map(d => d.year))
            setYear(year)
            setCountryData(countryData => ({
              ...countryData,
              [countryId1.key]: data
            }))
          })
      } else {
        let years = range(settings.minYear, settings.maxYear + 1);
        getCountry(
          countryId1.key,
          years,
          year,
          d => setCountryData(countryData => ({
            ...countryData,
            [countryId1.key]: countryData[countryId1.key]
              ? countryData[countryId1.key].concat(d).sort((d1, d2) => d1.year - d2.year)
              : [d]
          }))
        );
      }
    }
  }, [countryId1])

  useEffect(() => {
    if (countryId2 && !countryData[countryId2.key]) {
      if(countryId2.source === 'scb') {
        axios('area' + countryId2.key + '.json')
          .then(response => response.data)
          .then((data: Demography[]) => {
            const year = Math.max(...data.map(d => d.year))
            setYear(year)
            setCountryData(countryData => ({
              ...countryData,
              [countryId2.key]: data
            }))
          })
      } else {
        let years = range(settings.minYear, settings.maxYear + 1);
        getCountry(
          countryId2.key,
          years,
          year,
          d => setCountryData(countryData => ({
            ...countryData,
            [countryId2.key]: countryData[countryId2.key]
              ? countryData[countryId2.key].concat(d).sort((d1, d2) => d1.year - d2.year)
              : [d]
          }))
        );
      }
    }
  }, [countryId2])

  const data1 = countryData1?.find(d => d.year === year);
  const data2 = countryData2?.find(d => d.year === year);

  const maxAge1 = Math.max(...(countryData1?.map(d => d.ageMen.concat(d.ageWoman)).flat().filter(v => v) || []))
  const maxAge2 = Math.max(...(countryData2?.map(d => d.ageMen.concat(d.ageWoman)).flat().filter(v => v) || []))

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

  return (
    <div style={{ margin: 20 }}>
      <Slider
        value={year}
        min={settings.minYear}
        max={settings.maxYear}
        onChange={setYear}
        labelStepSize={10}
      />
      <div style={{ display: 'flex' }}>
        <Pyramid
          selectedItem={countryId1}
          data={data1}
          max={maxAge1}
          onItemSelect={area => selectCountryId1(area)}
        />
        {single && <Pyramid
          selectedItem={countryId2}
          data={data2}
          max={maxAge2}
          onItemSelect={area => selectCountryId2(area)}
        />}
      </div>
      <MultiSlider
        min={0}
        max={99}
        onChange={setRanges}
        labelStepSize={5}
        stepSize={5}
      >
        <MultiSlider.Handle value={ranges[0]} interactionKind="push" type="start" intentBefore="warning" intentAfter="primary"/>
        <MultiSlider.Handle value={ranges[1]} interactionKind="push" type="end" intentAfter="success"/>
      </MultiSlider>
      <div style={{ height: window.innerHeight > 800 ? 'calc(100vh - 500px - 140px)' : '80vh', display: 'flex' }}>
        <HistoryChart useProcent={useProcent} setProcent={setProcent} year={year} data={sum1} labels={historyLabels}/>
        {single && <HistoryChart useProcent={useProcent} setProcent={setProcent} year={year} data={sum2} labels={historyLabels}/>}
      </div>
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

function AppWithProviders() {
  return (
    // <QueryClientProvider client={queryClient}>
      <App />
    // </QueryClientProvider>
  )
}

export default AppWithProviders;
