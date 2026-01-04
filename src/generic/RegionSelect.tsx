import { useCallback, useState } from "react"
import { Button, Divider, Menu, MenuItem, Radio, RadioGroup } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import census from '../assets/census.json'
import scb from '../assets/scb.json'

export const items = census.concat(scb)

// export type Source = string // 'scb' | 'census'
export type Area = typeof items[number]

type AreaSortKey = typeof sorters[number]['key']
const sorters = [
  { text: "Alphabetical", key: 'name' },
  { text: "Population", key: 'totalPop' },
  { text: "Mean Age", key: 'meanAge' },
  { text: "Gender Diff", key: 'genderImbalance' },
  { text: "Gender Diff Working", key: 'genderImbalanceWorking' },
  { text: "Std Age", key: 'stdAge' },
  { text: "Dependency Ratio", key: 'dependencyRatio' },
  { text: "Children", key: 'children' },
  { text: "Retirees", key: 'retieries' },
  { text: "Growth", key: 'growthTotal10' },
  { text: "Growth Children", key: 'growthChildren10' },
  { text: "Growth Working", key: 'growthWorking10' },
  { text: "Growth Retirees", key: 'growthRetieries10' },
] as const satisfies readonly { text: string, key: typeof items[number]['code'] }[]

type Source = 'all'|'census'|'scb'

export default function RegionalSelect(props: {
  selected: Area|null
  onItemSelect: (area: Area) => void
}) {
  const [source, setSource] = useState<Source>('all')
  const [sortKey, setSortKey] = useState<AreaSortKey>('totalPop')
  const [desc, setDesc] = useState(false)

  const selectedText = props.selected?.name ?? 'Select Area'
  
  const setSort = useCallback((sortKeyNew: AreaSortKey) => {
    if(sortKeyNew === sortKey) {
      setDesc(!desc)
    } else {
      setSortKey(sortKeyNew)
    }
  }, [sortKey, desc])

  const sorter = useCallback(
    (a: any, b: any) => (desc ? -1 : 1) * (b[sortKey] > a[sortKey] ? -1 : 1),
    [sortKey, desc]
  )

  return <div style={{ display: 'flex' }}>
    <Select<Area>
      items={items}
      onItemSelect={item => props.onItemSelect(item)}
      itemPredicate={(query, item) => item.name.toLocaleLowerCase().includes(query.toLowerCase())}
      itemListRenderer={(renderer) => <>
        <div style={{ width: 380, margin: 4, marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
          <RadioGroup selectedValue={source} inline onChange={event => setSource(event.currentTarget.value as Source)}>
            <Radio label="All" value="all" />
            <Radio label="Countries" value="census" />
            <Radio label="Swedish regions" value="scb" />
          </RadioGroup>
        </div>
        <Divider/>
        <div style={{ width: 380, margin: 4, display: 'flex', flexWrap: 'wrap' }}>
          {sorters.map(sort =>
            <Button
              minimal
              key={sort.key}
              text={sort.text}
              active={sort.key === sortKey}
              rightIcon={sort.key !== sortKey ? null : desc ? 'sort-desc' : 'sort-asc'}
              onClick={() => setSort(sort.key)}
            />
          )}
          {/* <Popover content={<Menu>
            <MenuItem icon=""
          </Menu>}
          >
            <Button icon="label"/>
          </Popover> */}
        </div>
        <Divider/>
        <Menu>
          {renderer.filteredItems
            .filter(area => source === 'all' || area.source === source)
            .sort(sorter)
            .map(renderer.renderItem)}
        </Menu>
      </>}
      itemRenderer={(item, { handleClick, modifiers }) => <MenuItem
        {...modifiers}
        selected={modifiers.active}
        key={item.name}
        onClick={handleClick}
        text={item.name}
        label={item[sortKey].toLocaleString()}
      />}
    >
      <Button minimal rightIcon="caret-down">{selectedText}</Button>
    </Select>
    <Button icon="random" minimal onClick={() => props.onItemSelect(randomArea(source)) } />
  </div>
}

export function randomArea(source: Source) {
  const areasFiltered = items.filter(item => source === 'all' || item.source === source)

  const randomIndex = Math.round(areasFiltered.length * Math.random())
  const area = areasFiltered[randomIndex]
  return area
}