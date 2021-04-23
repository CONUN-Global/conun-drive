import React from "react";
import { useQuery } from "react-query";

import instance from "../../../axios/instance";
import FilesHorizontalViewer from "../../FilesHorizontalViewer";

function SavedSearchFiles({ search }) {
  const { data } = useQuery(
    ["search", search.keyword, search.filter],
    async () => {
      const { data } = await instance(
        `/search/content?keyword=${search?.keyword ?? ""}&filter=${
          search?.filter ?? ""
        }`
      );
      return data;
    }
  );

  return <FilesHorizontalViewer files={data?.data?.data} mini />;
}

export default SavedSearchFiles;
