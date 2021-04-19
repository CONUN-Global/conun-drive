import React from "react";

import AsyncCreatableSelect from "react-select/async-creatable";
import customStyles from "../styles";

const colourOptions = [
  { label: "red", value: "red" },
  { label: "blue", value: "blue" },
  { label: "yellow", value: "yellow" },
  { label: "purple", value: "purple" },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

interface TagsSelectProps {
  onChange: (values: any) => void;
  isMulti?: boolean;
  formatCreateLabel?: (value: string) => string;
  placeholder?: string;
}

function TagsSelect({ ...props }: TagsSelectProps) {
  return (
    <AsyncCreatableSelect
      cacheOptions
      defaultOptions
      styles={{
        ...customStyles,
        control: (provided) => ({
          ...customStyles.control(provided),
          height: 64,
        }),
      }}
      loadOptions={promiseOptions}
      {...props}
    />
  );
}

export default TagsSelect;
