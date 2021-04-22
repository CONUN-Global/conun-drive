import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../../Button";
import Popper from "../../../Popper";
import Checkbox from "../../../Form/Checkbox";

import styles from "./SearchBar.module.scss";

const filters = [
  {
    value: "title",
    label: "Title",
  },
  { value: "tags", label: "Tags" },
  { value: "cid", label: "Hash ID" },
];

function SearchBar() {
  const { register, control } = useForm();
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.SearchBarContainer}>
      <form onSubmit={handleSearch} className={styles.Form}>
        <input className={styles.SearchBar} type="text" />
        <Popper
          manager={<div>Settings</div>}
          placement="bottom"
          modifiers={[
            {
              name: "offset",
              enabled: true,
              options: {
                offset: [0, 12],
              },
            },
          ]}
        >
          <div className={styles.FiltersPopper}>
            <p className={styles.Title}>Search by:</p>
            <div className={styles.FiltersContainer}>
              <Controller
                name="filterBy"
                control={control}
                render={() => (
                  <>
                    {filters.map((filter) => (
                      <Checkbox
                        key={filter.value}
                        id="terms-and-conditions"
                        className={styles.Checkbox}
                        checked={false}
                        onChange={(e) => console.log(e)}
                        label={filter.label}
                      />
                    ))}
                  </>
                )}
              />
            </div>
            <Button type="button" className={styles.ApplyButton}>
              Apply
            </Button>
          </div>
        </Popper>
      </form>
      <Button noStyle className={styles.SaveButton}>
        Save Search
      </Button>
    </div>
  );
}

export default SearchBar;
