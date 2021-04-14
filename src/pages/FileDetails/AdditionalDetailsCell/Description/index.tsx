import React, { useState } from "react";

import classNames from "classnames";

import style from "./Description.module.scss";

function Description() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={style.ItemDescription}>
      <div className={style.BoxTitle}>Description</div>
      <div className={style.DescriptionText}>
        Nulla sed auctor nunc. Nunc accumsan vitae risus quis vulputate.
        Vestibulum rhoncus, sem eget condimentum faucibus, lacus eros dignissim
        neque, id maximus dui eros eu magna. Vestibulum rutrum magna nibh, in
        maximus tortor luctus et. Donec luctus orci sem, id ullamcorper magna
        mattis nec. Suspendisse sit amet augue vitae nunc ultrices dignissim.
        Mauris non libero at odio rhoncus iaculis.
      </div>
    </div>
  );
}

export default Description;
