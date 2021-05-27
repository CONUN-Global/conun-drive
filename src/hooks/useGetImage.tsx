import { useQuery } from "react-query";
import axios from "axios";

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
    data: data || `http://localhost:8080/ipfs/${thumbHash}`,
    isLoading,
    error,
    refetch,
  };
}

export default useGetImage;
