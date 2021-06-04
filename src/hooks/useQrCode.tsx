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

  const readQRCode = (qrDataString) => {
    const { data } = useQuery(
      "read-qr-code",
      () => api.readQRCode(qrDataString),
      {}
    );
    return data;
  };

  return { makeQRCode, readQRCode };
}

export default useQrCode;
