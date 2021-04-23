import { useQuery } from "react-query";
import instance from "../axios/instance";

function useGetDownloads({ authorID, limit }) {
  const { data, isLoading } = useQuery(["downloads", authorID], async () => {
    const { data } = await instance.get(
      `/content/downloaded-by/${authorID}?limit=${limit}`
    );
    return data.data.data;
  });

  return { data, isLoading };
}

export default useGetDownloads;
