import { useMutation } from "react-query";

const { api } = window;

function useDownloadFile() {
  const {
    mutateAsync: downloadFile,
    isLoading,
    mutate,
  } = useMutation("download-file", (hash: string) => api.downloadFile(hash));
  return { downloadFile, isLoading, mutate };
}

export default useDownloadFile;
