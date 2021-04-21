import React from "react";

import Button from "../../../../components/Button";

import styles from "./LikeBar.module.scss";
import HeartIcon from "../../../../assets/icons/heart.svg";
import useLikeContent from "../../../../hooks/useLikeContent";
import useCurrentUser from "../../../../hooks/useCurrentUser";

type LikeProps = {
  likes: number;
  downloads?: number;
  publicHash: string;
  contentId: number;
};

function LikeControls({ likes, publicHash, contentId }: LikeProps) {
  const { currentUser } = useCurrentUser();
  const { likeContent } = useLikeContent();

  return (
    <div className={styles.Controls}>
      <Button
        noStyle
        onClick={async () => {
          const data = await likeContent({
            userId: currentUser?.id,
            contentId: contentId,
            publicHash: publicHash,
          });
        }}
      >
        <HeartIcon className={styles.Icon} />
        <span className={styles.LikeNumber}>{likes}</span>
      </Button>
    </div>
  );
}

function LikeBar({ downloads, likes, publicHash, contentId }: LikeProps) {
  return (
    <div className={styles.LikeBar}>
      <div className={styles.Uploaded}>{downloads} Total Downloads</div>
      <LikeControls
        likes={likes}
        publicHash={publicHash}
        contentId={contentId}
      />
    </div>
  );
}
export default LikeBar;
