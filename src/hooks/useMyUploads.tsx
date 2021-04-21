import { useQuery } from "react-query";
import instance from "../axios/instance";

function useMyUploads({ authorID, LIMIT }) {
  const { data, isLoading } = useQuery(["uploads", authorID], async () => {
    const formData = new FormData();
    formData.append("author", authorID);
    formData.append("order_by", "rate");
    formData.append("limit", LIMIT);
    const { data } = await instance.post("/content/get-contents-by", formData);
    return data.data;
  });
  return { data, isLoading };
}

export default useMyUploads;
