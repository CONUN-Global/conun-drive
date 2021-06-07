import React from "react";

import Button from "../Button";
import Popper from "../Popper";
import Peer from "./Peer";

import useGetPeers from "../../hooks/useGetPeers";

import DotIcon from "../../assets/icons/dot.svg";

import styles from "./PeersButton.module.scss";

function PeersButton() {
  const { data: peers, refetch } = useGetPeers();

  return (
    <Popper
      placement="bottom-start"
      manager={
        <Button
          className={styles.PeersButton}
          variant="grey"
          onClick={() => refetch()}
        >
          <DotIcon className={styles.DotIcon} />
          {peers?.length ?? 0} Peers Online
        </Button>
      }
      modifiers={[
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [-150, 12],
          },
        },
      ]}
    >
      <div className={styles.PeersPopper}>
        <div className={styles.PeersContainer}>
          <div className={styles.HeaderRow}>
            <p className={styles.Header}>Location</p>
            <p className={styles.Header}>Peer ID</p>
          </div>
          {peers?.map((peer) => (
            <Peer key={peer.addr} peer={peer} />
          ))}
        </div>
      </div>
    </Popper>
  );
}

export default PeersButton;
