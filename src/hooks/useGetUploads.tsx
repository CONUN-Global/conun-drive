import { useQuery } from "react-query";
import instance from "../axios/instance";

function useGetUploads({ authorID, limit }) {
  const { data, isLoading } = useQuery(["uploads", authorID], async () => {
    console.log("useUploads with ID: ", authorID);

    const formData = new FormData();
    formData.append("user_id", authorID);
    formData.append("order_by", "rate");
    formData.append("limit", limit);
    const { data } = await instance.post("/content/get-contents-by", formData);
    return data.data;
  });
  return { data, isLoading };
}

export default useGetUploads;
