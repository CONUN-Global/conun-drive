import { useMutation } from "react-query";

const { api } = window;

function useUpdateLaterList() {
  const { mutateAsync: updateList, isLoading } = useMutation(
    "update-later-list",
    async (newList: string[]) => {
      const { list } = await api.updateLaterList(newList);

      return list.list;
    }
  );

  return {
    updateList,
    isLoading,
  };
}

export default useUpdateLaterList;
