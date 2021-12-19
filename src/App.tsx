import React, { useState } from 'react';
import './App.css';
import { MultiSlider, Slider } from '@blueprintjs/core';
import Pyramid from './Pyramid';
import HistoryChart from './HistoryChart';
import getCountry from './api';
import fips, { Country } from './fips';

const settings = {
  minYear: 1980,
  maxYear: 2100,
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
  const [ranges, setRanges] = useState<number[]>([18, 65]);

  const countryData1 = country1 && countryData[country1.FIPS];
  const countryData2 = country2 && countryData[country2.FIPS];

  const totalPop = countryData1?.map(y => y.ageMen.map((v, i) => v + y.ageWoman[i]))
  const sum1 = [
    totalPop?.map(y => y.filter((v, i) => 5*i < ranges[0]).reduce((sum, value) => sum + value, 0)),
    totalPop?.map(y => y.filter((v, i) => 5*i >= ranges[0] && 5*i < ranges[1]).reduce((sum, value) => sum + value, 0)),
    totalPop?.map(y => y.filter((v, i) => 5*i >= ranges[1]).reduce((sum, value) => sum + value, 0)),
  ] as number[][];

  // console.log('sum1', sum1);

  const data1 = countryData1?.find(d => d.year === year);
  const data2 = countryData2?.find(d => d.year === year);

  // console.log('data1', data1, countryData);
  // console.log('data2', data2, countryData);

  return (
    <div style={{ margin: 20 }}>
      <Slider
        value={year}
        min={settings.minYear}
        max={settings.maxYear}
        onChange={setYear}
        labelStepSize={5}
      />
      <div style={{ display: 'flex' }}>
        <Pyramid
          selectedItem={country1}
          items={countries}
          data={data1}
          onItemSelect={country => {
            
            if (!countryData[country.FIPS]) {
              let years = range(settings.minYear, settings.maxYear + 1);
              getCountry(country.FIPS, years)
                .then(d => setCountryData(countryData => ({ ...countryData, [country.FIPS]: d })))
            }

            selectCountry1(country);
          }}
        />
        <Pyramid
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
        />
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
      <div style={{ height: 'calc(100vh - 500px - 140px)' }}>
        <HistoryChart data={sum1}/>
      </div>
    </div>
  );
}

export default App;
