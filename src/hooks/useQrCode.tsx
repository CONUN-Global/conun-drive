import { useQuery } from "react-query";

const { api } = window;

function useQrCode() {
  const makeQRCode = (filePublicHash: string) => {
    const { data } = useQuery(
      "get-qr-code-from-file-url",
      () => api.createQrCode(`conun-drive://${filePublicHash}`),
      {}
    );

    return data;
  };

  return { makeQRCode };
}

export default useQrCode;
