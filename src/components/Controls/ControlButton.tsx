import clsx from "clsx";
import { usePlayerContext } from "../Player";
import { Pause, Play, RotateCw } from "react-feather";

const ControlButton = () => {
  const { progress, playing, playingIndex, controls } = usePlayerContext();
  const isRepeat = playingIndex === 3 && progress === 100;

  return (
    <div
      id="repeat"
      className={clsx(
        "absolute top-0 left-1/2 -translate-x-1/2",
        "flex items-center justify-center",
        "rounded-full h-14 w-14",
        "bg-[#2e2e30] bg-opacity-70 backdrop-blur"
      )}
      style={{ clipPath: "circle()" }}
    >
      <button
        className="opacity-0"
        onClick={isRepeat ? controls.repeat : playing ? controls.pause : controls.play}
      >
        {isRepeat ? (
          <RotateCw strokeWidth={4} className="-rotate-[60deg]" />
        ) : playing ? (
          <Pause fill="white" />
        ) : (
          <Play fill="white" />
        )}
      </button>
    </div>
  );
};

export default ControlButton;
