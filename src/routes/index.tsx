import { max } from 'mathjs'
import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQueries } from '@tanstack/react-query'
import { Checkbox, MultiSlider, Slider } from '@blueprintjs/core'
import PopulationPyramid from '../generic/PopulationPyramid'
import { Region } from '../types/Region'
import HistoryChart from '../generic/HistoryChart'
import { Area, randomArea } from '../generic/RegionSelect'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [year, setYear] = useState(new Date().getFullYear() - 1)
  const [countryId1, selectCountryId1] = useState<Area|null>(randomArea())
  
  const [countryId2, selectCountryId2] = useState<Area|null>(randomArea())
  const [ageRanges, setAgeRanges] = useState<[number, number]>([20, 65])
  const [ageAsPercent, setAgeAsPercent] = useState(false)

  const halfView = useHalfView(700)

  const countryQueries = useQueries({
    queries: [countryId1, countryId2].map(area => ({
      queryKey: ['demographics', area?.code],
      queryFn: () => area
        ? axios(`./${area.source}/${area.fileName}`).then<Region>(response => response.data)
        : Promise.resolve(null),
      staleTime: Infinity
    }))
  })

  const selectedPyramid1 = countryQueries[0].data?.years.find(y => y.year === year)
  const selectedPyramid2 = countryQueries[1].data?.years.find(y => y.year === year)

  const years = countryQueries[0].data?.years.map(year => year.year) ?? []

  const maxValue1 = max(countryQueries[0].data?.years.flatMap(year => year.female.concat(year.male)).filter(v => v) ?? [0])
  const maxValue2 = max(countryQueries[1].data?.years.flatMap(year => year.female.concat(year.male)).filter(v => v) ?? [0])

  return (
    <div style={{ width: '98vw', height: '98vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <PopulationPyramid
          single={false}
          data={selectedPyramid1}
          max={maxValue1}
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
            data={selectedPyramid2}
            max={maxValue2}
            selectedItem={countryId2}
            onItemSelect={countryId => selectCountryId2(countryId)}
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
            data={countryQueries[1].data ?? null}
          />
        }
      </div>
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

function useHalfView(halfViewWidth: number) {
  const [halfView, setHalfView] = useState(halfViewWidth > window.innerWidth);

  useLayoutEffect(() => {
    function updateSize() {
      const newHalfView = halfViewWidth > window.innerWidth
      if (halfView !== newHalfView) {
        setHalfView(newHalfView);
      }
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return halfView;
}