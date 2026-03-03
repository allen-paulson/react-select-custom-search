import { useState } from "react";
import CustomSelect, { type Option } from "./components/CustomSelect/CustomSelect";

function App() {
  const dummyData: Option[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);


  return (
    <div className="flex items-center justify-center min-h-screen py-30">
      <div className="space-y-4">
        <h1>Custom React Select with Search inside dropdown</h1>
        <CustomSelect
          label="Select a Fruit"
          options={dummyData}
          value={selectedOption}
          onChange={setSelectedOption}
          isSearchable={false}
          enableCustomSearch
        />

        <div>
          <strong>Selected:</strong> {selectedOption?.label || "None"}
        </div>
      </div>
    </div>
  )
}

export default App
