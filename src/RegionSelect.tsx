import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { kommuner, regioner } from "./regioner";
import { countries } from "./fips";

const areaTable = { ...kommuner, ...regioner }

export type Source = 'scb' | 'usCensus'
export type Area = { key: string, name: string, source: Source }

type AreaKey = keyof typeof areaTable
const itemsScb: Area[] = Object.keys(areaTable)
  .map(key => key as any)
  .map((key: AreaKey) => ({ key, name: areaTable[key], source: 'scb' }))

const itemsUsCensus: Area[] = countries.map(c => ({ key: c.FIPS, name: c.name, source: 'usCensus' }))

export const items = itemsUsCensus.concat(itemsScb)

export default function(props: {
  selectedId: Area|null
  onItemSelect: (id: Area) => void
}) {
  const selectedText = items.find(item => item.key === props.selectedId?.key)?.name ?? 'Select Area'

  return <>
    <Select<typeof items[number]>
      items={items}
      onItemSelect={item => props.onItemSelect(item)}
      itemPredicate={(query, item) => item.name.toLocaleLowerCase().includes(query.toLowerCase())}
      itemRenderer={(item, { handleClick, modifiers }) => <MenuItem
      selected={modifiers.active}
      key={item.name}
      onClick={handleClick}
      text={item.name}
      />}
    >
      <Button minimal rightIcon="caret-down">{selectedText}</Button>
      <Button icon="random" minimal onClick={() => props.onItemSelect(randomArea()) } />
    </Select>
  </>
}

export function randomArea() {
  const randomIndex = Math.round(items.length * Math.random())
  const area = items[randomIndex]
  return area
}