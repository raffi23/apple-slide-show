import clsx from "clsx";
import { useAnimate } from "framer-motion";
import { FC, useCallback, useEffect } from "react";
import { usePlayerContext } from "../Player";
import BlueCircle from "./BlueCircle";
import ControlButton from "./ControlButton";
import ProgressBar from "./ProgressBar";

const Controls: FC = () => {
  const { inView } = usePlayerContext();
  const [scope, animate] = useAnimate();

  const showControls = useCallback(() => {
    animate([
      [scope.current, { opacity: 1 }],
      [scope.current, { scale: 1 }],
      [
        "#blue",
        { transform: `translate(-50%,-50%) scale(1.75)`, opacity: 1 },
        { at: "<" },
      ],
      [
        "#blue",
        { transform: `translate(-50%,-50%) scale(1)` },
        { duration: 0.35, delay: 0.1 },
      ],
      ["#progress", { transform: "translateX(calc(-50% - 36px))" }],
      [
        "#blue",
        { transform: `translate(-50%,-50%) scale(0)`, opacity: 0 },
        { at: "<", duration: 0.1 },
      ],
      ["button", { opacity: 1 }, { at: "<" }],
      ["#repeat", { transform: "translateX(calc(-50% + 92px))" }, { at: "<" }],
      ["#progress", { width: 180 }, { at: "<" }],
      ["#progress", { width: 168 }],
    ]);
  }, [scope, animate]);

  const hideControls = useCallback(() => {
    animate([
      ["#progress", { width: 56 }],
      ["#repeat", { transform: "translateX(calc(-50%))" }, { at: "<" }],
      ["#progress", { transform: "translateX(calc(-50%))" }, { at: "<" }],
      ["button", { opacity: 0 }],
      [scope.current, { scale: 0 }, { delay: 0.1 }],
      [scope.current, { opacity: 0 }],
    ]);
  }, [scope, animate]);

  useEffect(() => {
    if (inView) showControls();
    else hideControls();
  }, [inView, hideControls, showControls]);

  return (
    <div
      ref={scope}
      className={clsx("sticky bottom-8 mx-auto w-full h-14 scale-0 opacity-0")}
    >
      <ProgressBar />
      <ControlButton />
      <BlueCircle />
    </div>
  );
};

export default Controls;
