import { useState } from "react";
import CustomSelect, {
  type Option,
} from "./components/CustomSelect/CustomSelect";
import { components, type OptionProps } from "react-select";

function App() {
  const dummyData: Option[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const CustomOption = (props: OptionProps<Option>) => {
    return (
      <components.Option {...props}>
        <div className="space-y-0.5 px-1">
          <div className="text-base font-medium">{props.data.label}</div>
          <div className="text-sm text-gray-500 font-medium">
            Value is: {props.data.value}
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-30 [scrollbar-gutter:stable] overflow-auto">
      <div className="space-y-4">
        <h1>Custom React Select with Search inside dropdown</h1>
        <CustomSelect
          label="Select a Fruit"
          options={dummyData}
          value={selectedOption}
          onChange={setSelectedOption}
          isSearchable={false}
          enableCustomSearch
          components={{ Option: CustomOption }}
        />
      </div>
    </div>
  );
}

export default App;
