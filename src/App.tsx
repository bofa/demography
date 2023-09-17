import React, { useEffect, useState } from 'react';
import './App.css';
import { MultiSlider, Slider } from '@blueprintjs/core';
import Pyramid from './Pyramid';
import HistoryChart from './HistoryChart';
import getCountry from './api';
import countries, { Country } from './fips';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [country1, selectCountry1] = useState<Country | undefined>(undefined);
  const [country2, selectCountry2] = useState<Country | undefined>(undefined);
  const [countryData, setCountryData] = useState<{ [key: string]: { year: number, ageMen: number[], ageWoman: number[] }[] }>({});
  const [ranges, setRanges] = useState<number[]>([20, 65]);

  const countryData1 = country1 && countryData[country1.FIPS];
  const countryData2 = country2 && countryData[country2.FIPS];

  const country = countries.find(c => c.FIPS === country1?.FIPS);

  const totalPop = countryData1?.map(y => ({
    year: y.year,
    pop: y.ageMen.map((v, i) => v + y.ageWoman[i])
  }));

  const sum1 = [
    totalPop?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i < ranges[0]).reduce((sum, value) => sum + value, 0) })),
    totalPop?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[0] && 5*i < ranges[1]).reduce((sum, value) => sum + value, 0) })),
    totalPop?.map(y => ({ year: y.year, sum: y.pop.filter((v, i) => 5*i >= ranges[1]).reduce((sum, value) => sum + value, 0) })),
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

  useEffect(() => {
    const randomIndex = Math.round(countries.length * Math.random());
    const country = countries[randomIndex];
    selectCountry1(country);
  }, [])

  useEffect(() => {
    if (country && !countryData[country.FIPS]) {
      let years = range(settings.minYear, settings.maxYear + 1);
      getCountry(
        country.FIPS,
        years,
        year,
        d => setCountryData(countryData => ({
          ...countryData,
          [country.FIPS]: countryData[country.FIPS]
            ? countryData[country.FIPS].concat(d).sort((d1, d2) => d1.year - d2.year)
            : [d]
        }))
      );
    }
  }, [country1])

  const data1 = countryData1?.find(d => d.year === year);
  const data2 = countryData2?.find(d => d.year === year);

  const maxAge1 = Math.max(...(countryData1?.filter(d => d.ageMen.every(a => a)).map(d => Math.max(...d.ageMen, ...d.ageWoman)) || []))

  // Calculate key numbers
  if (data1?.ageMen) {
    const mergeSexes = data1.ageMen.map((m, i) => m + data1.ageWoman[i]);
    const mean = mergeSexes.reduce((sum, v, i) => sum + i*v, 0) / mergeSexes.reduce((sum, v, i) => sum + v, 0)
    
    const menTotal = data1.ageMen.reduce((s, v) => s+v);
    const womanTotal = data1.ageWoman.reduce((s, v) => s+v);
    const diffSexes = (menTotal-womanTotal)/(menTotal+womanTotal);

    const menTotal10 = data1.ageMen.slice(0, 2).reduce((s, v) => s+v);
    const womanTotal10 = data1.ageWoman.slice(0, 2).reduce((s, v) => s+v);
    const diffSexes10 = (menTotal10-womanTotal10)/(menTotal10+womanTotal10);
    
    console.log(
      'Mean Age', Math.round(5 * mean),
      'Surplus Men[%]', Math.round(1000*diffSexes) / 10,
      'Surplus Men <11[%]', Math.round(1000*diffSexes10) / 10
    );
  }


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
          selectedItem={country1}
          items={countries}
          data={data1}
          max={maxAge1}
          onItemSelect={country => selectCountry1(country)}
        />
        {/* <Pyramid
          selectedItem={country2}
          items={countries}
          data={data2}
          onItemSelect={country => {
            
            if (!countryData[country.FIPS]) {
              let years = range(settings.minYear, settings.maxYear);
              getCountry(country.FIPS, years)
                .then(d => setCountryData(countryData => ({ ...countryData, [country.FIPS]: d })))
            }

            selectCountry2(country);
          }}
        /> */}
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
      <div style={{ height: window.innerHeight > 800 ? 'calc(100vh - 500px - 140px)' : '80vh' }}>
        <HistoryChart year={year} data={sum1} labels={historyLabels}/>
      </div>
    </div>
  );
}

const queryClient = new QueryClient()
function AppWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

export default AppWithProviders;
