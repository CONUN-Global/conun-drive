import { useQuery } from "react-query";

const { api } = window;

function useMakeQRCode(filePublicHash) {
  const { data } = useQuery(
    "get-qr-code-from-file-url",
    () => api.createQRCode(`conun-drive://${filePublicHash}`),
    { refetchOnMount: "always" }
  );

  return data;
}

export default useMakeQRCode;
