import { Placement } from "@popperjs/core";
import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";
import Button from "../Button";
import OutsideClickHandler from "../OutsideClickHandler";

import customStyles from "./Popper.module.scss";

interface PopperProps {
  children: React.ReactNode;
  manager: React.ReactNode;
  modifiers?: unknown[];
  placement?: Placement;
}

function Popper({
  children,
  manager,
  modifiers = [],
  placement = "top",
}: PopperProps) {
  const [isVisible, setisVisible] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement,
      modifiers,
    }
  );

  return (
    <OutsideClickHandler onClickOutside={() => setisVisible(false)}>
      <button
        type="button"
        ref={referenceRef}
        className={customStyles.Button}
        onClick={() => setisVisible(!isVisible)}
      >
        {manager}
      </button>
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        {isVisible && <div style={styles.offset}>{children}</div>}
      </div>
    </OutsideClickHandler>
  );
}

export default Popper;
