import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { Country } from "./fips";

const AbstractSelect = Select.ofType<Country>();

interface Props {
  selectedItem?: Country;
  items: Country[];
  onItemSelect: (c: Country) => void;
}

export default function(props: Props) {
  const selectedText = props.selectedItem?.name || 'Select Country';
  const { items, onItemSelect } = props;

  return <>
    <AbstractSelect
      {...props}
      itemPredicate={(query, item) => item.name.toLocaleLowerCase().includes(query.toLowerCase())}
      itemRenderer={(item, { handleClick, modifiers }) => <MenuItem
      selected={modifiers.active}
      key={item.name}
      onClick={handleClick}
      text={item.name}
      />}
      >
      <Button minimal rightIcon="caret-down">{selectedText}</Button>
    </AbstractSelect>
    <Button icon="random" minimal onClick={() => onItemSelect(items[Math.floor(items.length * Math.random())]) } />
  </>
}