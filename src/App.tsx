import React, { useEffect, useState } from 'react';
import './App.css';
import { MultiSlider, Slider } from '@blueprintjs/core';
import Pyramid from './Pyramid';
import HistoryChart from './HistoryChart';
import getCountry from './api';
import fips, { Country } from './fips';

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

const countries = fips

// const countries = [
//   { name: 'Sweden' },
//   { name: 'Norway' },
// ]

function App() {
  const [year, setYear] = useState(2021);
  const [country1, selectCountry1] = useState<Country | undefined>(undefined);
  const [country2, selectCountry2] = useState<Country | undefined>(undefined);
  const [countryData, setCountryData] = useState<{ [key: string]: { year: number, ageMen: number[], ageWoman: number[] }[] }>({});
  const [ranges, setRanges] = useState<number[]>([20, 65]);

  const countryData1 = country1 && countryData[country1.FIPS];
  const countryData2 = country2 && countryData[country2.FIPS];

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

  useEffect(() => {
    const randomIndex = Math.round(countries.length * Math.random());
    const country = countries[randomIndex];
    selectCountry1(country);
  }, [])

  useEffect(() => {
    const country = countries.find(c => c.FIPS === country1?.FIPS);

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

export default App;
