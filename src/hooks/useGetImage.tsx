import { useQuery } from "react-query";
import axios from "axios";

function useGetImage(thumbHash: string) {
  const { data, isLoading, error, refetch } = useQuery(
    ["get-preview", thumbHash],
    async () => {
      const { data } = await axios.get(
        `http://localhost:8080/ipfs/${thumbHash}`,
        {
          responseType: "arraybuffer",
        }
      );

      return `data:image/png;base64,${Buffer.from(data).toString("base64")}`;
    },
    {
      refetchInterval: 2000,
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
