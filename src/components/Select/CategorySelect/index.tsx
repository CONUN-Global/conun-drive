import React from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import instance from "../../../axios/instance";

import customStyles from "../styles";

function CategorySelect() {
  const { data } = useQuery("get-all-categories", async () => {
    const { data } = await instance.get("/cate/get_all");
    return data;
  });

  return (
    <Select
      menuPlacement="top"
      options={
        data?.data?.map((cat) => ({ value: cat.id, label: cat.name })) ?? []
      }
      placeholder=""
      styles={customStyles}
    />
  );
}

export default CategorySelect;
