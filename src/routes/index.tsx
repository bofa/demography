import { useQueries } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import PopulationPyramid from '../generic/PopulationPyramid'
import { Area } from '../generic/RegionSelect'
import { Region } from '../types/Region'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [year, setYear] = useState(new Date().getFullYear() - 1)
  const [countryId1, selectCountryId1] = useState('SE')
  
  const [countryId2, selectCountryId2] = useState(null)
  const [ageRanges, setAgeRanges] = useState<number[]>([20, 65])
  const [ageAsPercent, setAgeAsPercent] = useState(false)

  const halfView = false

  const countryQueries = useQueries({
    queries: [countryId1, countryId2].map(countryId => ({
      queryKey: ['demographics', countryId],
      queryFn: () => countryId
        ? axios(`./yearly/${countryId}.json`).then<Region>(response => response.data)
        : Promise.resolve(null),
      staleTime: Infinity
    }))
  })

  console.log('countryQueries', countryQueries)

  const selectedPyramid = countryQueries[0].data?.years.find(y => +y.year === year)

  console.log('selectedPyramid', countryQueries[0].data)

  return (
    <div style={{ width: '90vw', height: '90vh', display: 'flex', flexDirection: 'row' }}>
      <div>
        <div>
          <PopulationPyramid
            single={false}
            data={selectedPyramid}
            max={0}
          />
          <YearSlider/>
        </div>
        <div>
          <AgeHistoryChart/>
          <AgeRangeSlider/>
        </div>
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

function YearSlider() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      YearSlider
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