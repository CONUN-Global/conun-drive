import { useQuery } from "react-query";
import instance from "../axios/instance";

function useMyDownloads({ authorID, LIMIT }) {
  const { data, isLoading } = useQuery(["downloads", authorID], async () => {
    console.log("/content/downloaded-by/" + authorID + "?limit=" + LIMIT);
    const { data } = await instance.get(
      `/content/downloaded-by/${authorID}?limit=${LIMIT}`
    );
    return data.data;
  });

  return { data, isLoading };
}

export default useMyDownloads;
