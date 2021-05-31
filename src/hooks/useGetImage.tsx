import { useQuery } from "react-query";
import axios from "axios";

import { BOOTSTRAP } from "../const";

function useGetImage(thumbHash: string) {
  const { data, isLoading, error, refetch } = useQuery(
    ["get-preview", thumbHash],
    async () => {
      const { data } = await axios.get(
        `http://localhost:8080/ipfs/${thumbHash}`,
        {
          responseType: "blob",
        }
      );

      return URL.createObjectURL(data);
    }
  );

  return {
    data: data || `${BOOTSTRAP}/ipfs/${thumbHash}`,
    isLoading,
    error,
    refetch,
  };
}

export default useGetImage;
