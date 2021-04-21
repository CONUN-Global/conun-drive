import React from "react";

import Button from "../../../../components/Button";
import Tooltip from "../../../../components/Tooltip";

import useLikeContent from "../../../../hooks/useLikeContent";
import useCurrentUser from "../../../../hooks/useCurrentUser";

import HeartIcon from "../../../../assets/icons/heart.svg";

import styles from "./LikeBar.module.scss";

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
      <Tooltip id="heart">
        <Button
          data-for="heart"
          data-tip="Liking is permanent."
          noStyle
          onClick={async () => {
            await likeContent({
              userId: currentUser?.id,
              contentId: contentId,
              publicHash: publicHash,
            });
          }}
        >
          <HeartIcon className={styles.Icon} />
        </Button>
        <span className={styles.LikeNumber}>{likes}</span>
      </Tooltip>
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
