import { Button, Divider, Menu, MenuItem } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import scb from './data/scb.json'
import census from './data/census.json'
import { useCallback, useState } from "react"

export const items = scb.concat(census) // itemsUsCensus.concat(itemsScb)

// export type Source = string // 'scb' | 'census'
export type Area = typeof items[number]

type AreaSortKey = 'totalPop' | 'name' | 'meanAge' | 'genderImbalance' | 'genderImbalanceDating' | 'growth10Years' | 'stdAge'

export default function(props: {
  selectedId: Area|null
  onItemSelect: (id: Area) => void
}) {
  const [sortKey, setSortKey] = useState<AreaSortKey>('totalPop')
  const [desc, setDesc] = useState(false)

  const selectedText = items.find(item => item.code === props.selectedId?.code)?.name ?? 'Select Area'
  
  const setSort = useCallback((sortKey: AreaSortKey, desc: boolean) => {
    setSortKey(sortKey)
    setDesc(desc)
  }, [])

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
        <div style={{ width: 400, margin: 4, display: 'flex', flexWrap: 'wrap' }}>
          <Button minimal text="Alphabetical" onClick={() => setSort('name', false)} />
          <Button minimal text="Population" onClick={() => setSort('totalPop', true)} />
          <Button minimal text="Mean Age" onClick={() => setSort('meanAge', true)} />
          <Button minimal text="Gender Diff" onClick={() => setSort('genderImbalance', true)} />
          <Button minimal text="Gender Diff Dating" onClick={() => setSort('genderImbalanceDating', true)} />
          <Button minimal text="Growth" onClick={() => setSort('growth10Years', true)} />
          <Button minimal text="Std Age" onClick={() => setSort('stdAge', true)} />
          
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
            .sort(sorter)
            .map(renderer.renderItem)}
        </Menu>
      </>}
      itemRenderer={(item, { handleClick, modifiers }) => <MenuItem
        selected={modifiers.active}
        key={item.name}
        onClick={handleClick}
        text={item.name}
        label={item[sortKey].toLocaleString()}
      />}
    >
      <Button minimal rightIcon="caret-down">{selectedText}</Button>
    </Select>
    <Button icon="random" minimal onClick={() => props.onItemSelect(randomArea()) } />
  </div>
}

export function randomArea() {
  const randomIndex = Math.round(items.length * Math.random())
  const area = items[randomIndex]
  return area
}