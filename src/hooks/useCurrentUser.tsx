import { useQuery } from "react-query";
import { setAuthHeader } from "../helpers/getAuthHeader";

const { api } = window;

function useCurrentUser() {
  const { data: currentUser, refetch } = useQuery(
    "get-current-user",
    async () => {
      const { data } = await api.getCurrentUser(
        "0xe4FD245bf3A78D414cFceec73d01b53959635935"
      );

      return data;
    },
    {
      onSuccess(data) {
        setAuthHeader(data?.id);
      },
    }
  );

  return {
    currentUser,
    refetch,
  };
}

export default useCurrentUser;
