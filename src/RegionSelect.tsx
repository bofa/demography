import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { kommuner, regioner } from "./regioner";

const areaTable = { ...kommuner, ...regioner }

type Area = { key: string, name: string }[]

type AreaKey = keyof typeof areaTable
const items: Area = Object.keys(areaTable)
  .map(key => key as any)
  .map((key: AreaKey) => ({ key, name: areaTable[key] }))

export default function(props: {
  selectedId?: string;
  onItemSelect: (id: string) => void;
}) {
  const selectedText = areaTable[props.selectedId as AreaKey] ?? 'Select Area';

  return <>
    <Select<typeof items[number]>
      items={items}
      onItemSelect={item => props.onItemSelect(item.key)}
      itemPredicate={(query, item) => item.name.toLocaleLowerCase().includes(query.toLowerCase())}
      itemRenderer={(item, { handleClick, modifiers }) => <MenuItem
      selected={modifiers.active}
      key={item.name}
      onClick={handleClick}
      text={item.name}
      />}
    >
      <Button minimal rightIcon="caret-down">{selectedText}</Button>
      {/* <Button icon="random" minimal onClick={() => onItemSelect(items[Math.floor(items.length * Math.random())]) } /> */}
    </Select>
  </>
}