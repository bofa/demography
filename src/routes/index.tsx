import { max } from 'mathjs'
import axios from 'axios'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQueries } from '@tanstack/react-query'
import { Slider } from '@blueprintjs/core'
import PopulationPyramid from '../generic/PopulationPyramid'
import { Area } from '../generic/RegionSelect'
import { Region } from '../types/Region'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [year, setYear] = useState(new Date().getFullYear() - 1)
  const [countryId1, selectCountryId1] = useState<string|null>('SE')
  
  const [countryId2, selectCountryId2] = useState(null)
  const [ageRanges, setAgeRanges] = useState<number[]>([20, 65])
  const [ageAsPercent, setAgeAsPercent] = useState(false)

  const halfView = false

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

  const selectedPyramid = countryQueries[0].data?.years.find(y => +y.year === year)
  const years = countryQueries[0].data?.years.map(year => +year.year) ?? []

  const maxValue = max(countryQueries.flatMap(country => country.data?.years.flatMap(year => year.ages.flatMap(age => [age.female, age.male])) ?? [0]))

  console.log('maxValue', maxValue)

  return (
    <div style={{ width: '90vw', height: '90vh', display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', width: '100%' }}>
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
        </div>
        <div>
          <AgeHistoryChart/>
          <AgeRangeSlider/>
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

// function PopulationPyramid() {
//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       PopulationPyramid
//     </div>
//   )
// }

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
        // min={1990}
        // max={2020}
        // value={year}
        // min={props.years.at(0)}
        // max={props.years.at(-1)}
        // onChange={year => setYear(year)}
        labelStepSize={10}
      />
    </div>
  )
}

function AgeHistoryChart() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      AgeHistoryChart
    </div>
  )
}

function AgeRangeSlider() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      AgeRangeSlider
    </div>
  )
}