import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import styles from "./Peer.module.scss";

const regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

function ipExtractor(addr: string) {
  return addr.match(regex);
}

function Peer({ peer }) {
  const { data } = useQuery(["peer", peer.addr], async () => {
    const { data } = await axios.get(
      `https://geolocation-db.com/jsonp/${ipExtractor(peer.addr)}`
    );

    return data.substring(26, 28);
  });

  console.log(`peer`, peer);

  return (
    <div className={styles.Peer}>
      <div className={styles.FlagContainer}>
        <img
          className={styles.Flag}
          src={`https://www.countryflags.io/${data}/flat/64.png`}
        />
      </div>

      <p>{peer.peer}</p>
    </div>
  );
}

export default Peer;
