const fileAnimationTransition = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export const mainPageAnimation = {
  exit: { y: "50%", opacity: 0, transition: fileAnimationTransition },
  enter: {
    y: "0%",
    opacity: 1,
    transition: fileAnimationTransition,
  },
};

export const filePageAnimation = {
  exit: { x: "50%", opacity: 0, transition: fileAnimationTransition },
  enter: {
    x: "0%",
    opacity: 1,
    transition: fileAnimationTransition,
  },
};
