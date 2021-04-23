import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

import Button from "../../../Button";
import Popper from "../../../Popper";
import Checkbox from "../../../Form/Checkbox";

import Tag from "../../../../assets/icons/tag.svg";
import Hashtag from "../../../../assets/icons/hashtag.svg";
import Title from "../../../../assets/icons/title.svg";
import Glass from "../../../../assets/icons/magnifying-glass.svg";
import Settings from "../../../../assets/icons/settings.svg";

import styles from "./SearchBar.module.scss";

const filters = [
  { value: "", label: "All" },
  {
    value: "title",
    label: "Title",
    Icon: Title,
  },
  { value: "tags", label: "Tags", Icon: Tag },
  { value: "cid", label: "Hash ID", Icon: Hashtag },
];

interface SearchFormData {
  searchString: string;
  filterBy: string;
}

function SearchBar() {
  const history = useHistory();
  const params = useParams<{ keyword: string }>();

  const { register, control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: { filterBy: params?.keyword ?? "" },
  });

  const handleSearch: SubmitHandler<SearchFormData> = async (values) => {
    history.push(
      `/search?keyword=${values.searchString}&filter=${values.filterBy}&page=1`
    );
  };
  return (
    <div className={styles.SearchBarContainer}>
      <form onSubmit={handleSubmit(handleSearch)} className={styles.Form}>
        <Glass className={styles.Glass} />
        <input
          className={styles.SearchBar}
          type="text"
          {...register("searchString", {
            required: true,
          })}
        />
        <Popper
          manager={<Settings className={styles.SettingsIcon} />}
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
                render={({ field: { value, onChange } }) => (
                  <>
                    {filters.map((filter) => {
                      const Icon = filter.Icon;
                      return (
                        <Checkbox
                          key={filter.value}
                          id={filter.value}
                          className={styles.Checkbox}
                          checked={value === filter.value}
                          onChange={() => onChange(filter.value)}
                          label={
                            <div className={styles.Label}>
                              {Icon && <Icon className={styles.Icon} />}{" "}
                              {filter.label}
                            </div>
                          }
                        />
                      );
                    })}
                  </>
                )}
              />
            </div>
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
