import { useQuery } from "react-query";
import axios from "axios";

function useGetDescription(descriptionHash) {
  const { data, isLoading } = useQuery(
    ["get-description", descriptionHash],
    async () => {
      const { data } = await axios.get(
        `http://localhost:8080/ipfs/${descriptionHash}`
      );

      return data;
    },
    {
      enabled: !!descriptionHash,
    }
  );

  return { data, isLoading };
}

export default useGetDescription;
