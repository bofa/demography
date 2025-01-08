import { max } from 'mathjs'
import axios from 'axios'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQueries } from '@tanstack/react-query'
import { Checkbox, MultiSlider, Slider } from '@blueprintjs/core'
import PopulationPyramid from '../generic/PopulationPyramid'
import { Region } from '../types/Region'
import HistoryChart from '../generic/HistoryChart'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [year, setYear] = useState(new Date().getFullYear() - 1)
  const [countryId1, selectCountryId1] = useState<string|null>('SE')
  
  const [countryId2, selectCountryId2] = useState(null)
  const [ageRanges, setAgeRanges] = useState<[number, number]>([20, 65])
  const [ageAsPercent, setAgeAsPercent] = useState(false)

  const halfView = true

  const countryQueries = useQueries({
    queries: [countryId1, countryId2].map(countryId => ({
      queryKey: ['demographics', countryId],
      queryFn: () => countryId
        ? axios(`./census/${countryId}.json`).then<Region>(response => response.data)
        : Promise.resolve(null),
      staleTime: Infinity
    }))
  })

  // console.log('countryQueries', countryQueries)

  const selectedPyramid = countryQueries[0].data?.years.find(y => y.year === year)
  const years = countryQueries[0].data?.years.map(year => year.year) ?? []

  const maxValue = max(countryQueries.flatMap(country => country.data?.years.flatMap(year => year.ages.flatMap(age => [age.female, age.male])) ?? [0]))

  // console.log('maxValue', maxValue)

  return (
    <div style={{ width: '98vw', height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <PopulationPyramid
          single={false}
          data={selectedPyramid}
          max={1.1*maxValue}
          selectedItem={countryId1}
          onItemSelect={countryId => selectCountryId1(countryId)}
        />
        <YearSlider
          value={year}
          min={years.at(0)}
          max={years.at(-1)}
          // years={years}
          onChange={year => setYear(year)}            
        />
        {!halfView &&
          <PopulationPyramid
            single={false}
            data={selectedPyramid}
            max={1.1*maxValue}
            selectedItem={countryId1}
            onItemSelect={countryId => selectCountryId1(countryId)}
          />
        }
      </div>
      <div style={{ display: 'flex',  width: '100%', height: '100%' }}>
        <HistoryChart
          year={year}
          ageRanges={ageRanges}
          useProcent={ageAsPercent}
          data={countryQueries[0].data ?? null}
        />
        <AgeRange
          ageRanges={ageRanges}
          percent={ageAsPercent}
          setAgeRanges={setAgeRanges}
          setPercent={setAgeAsPercent}
        />
        {!halfView && 
          <HistoryChart
            year={year}
            ageRanges={ageRanges}
            useProcent={ageAsPercent}
            data={countryQueries[0].data ?? null}
          />
        }
      </div>
      {/* <div>
        <div>
          <PopulationPyramid/>
        </div>
        <div>
          <AgeHistoryChart/>
        </div>
      </div> */}
    </div>
  )
}

function YearSlider(props: {
  value: number
  min?: number
  max?: number
  onChange: (year: number) => void
}) {
  return (
    <div style={{ padding: 30, height: '100%' }}>
      <Slider
        {...props}
        vertical
        className="slider-vertical"
        labelStepSize={10}
        // TODO
        // labelRenderer
      />
    </div>
  )
}

function AgeRange(props: {
  ageRanges: [number, number]
  percent: boolean
  setAgeRanges: (range: [number, number]) => void
  setPercent: (percent: boolean) => void
}) {
  return (
    <div style={{ padding: '0px 20px 30px 10px', display: 'flex', flexDirection: 'column' }}>
      <Checkbox checked={props.percent} onChange={() => props.setPercent(!props.percent)}>%</Checkbox>
      <div style={{ height: '100%' }}>
        <MultiSlider
          vertical
          className="slider-vertical"
          min={0}
          max={100}
          onChange={props.setAgeRanges}
          labelStepSize={5}
          stepSize={1}
        >
          <MultiSlider.Handle value={props.ageRanges[0]} interactionKind="push" type="start" intentBefore="warning" intentAfter="primary"/>
          <MultiSlider.Handle value={props.ageRanges[1]} interactionKind="push" type="end" intentAfter="success"/>
        </MultiSlider>
      </div>
    </div>
  )
}