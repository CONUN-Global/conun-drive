import React from "react";

import useQrCode from "../../../../hooks/useQrCode";

import styles from "./QRBox.module.scss";

function QRBox({ publicHash }: { publicHash: string }) {
  const { makeQRCode } = useQrCode();

  const qrCodeSrc = makeQRCode(publicHash);

  console.log(publicHash, qrCodeSrc);

  return (
    <div className={styles.QRBox}>
      {qrCodeSrc && <img src={qrCodeSrc} alt="qr code" />}
    </div>
  );
}

export default QRBox;
