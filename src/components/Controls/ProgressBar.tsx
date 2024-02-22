import clsx from "clsx";
import { usePlayerContext } from "../Player";
import { videos } from "../helpers";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const { controls, progress, playingIndex } = usePlayerContext();
  const selectedVideo = videos[playingIndex];

  return (
    <div
      id="progress"
      className="absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden h-14"
    >
      <div
        className={clsx(
          "flex items-center gap-4 h-full px-6 rounded-full",
          "bg-[#2e2e30] bg-opacity-70 backdrop-blur"
        )}
      >
        {videos.map((video, index) => (
          <motion.button
            key={video.src}
            className="relative h-2 bg-white/50 rounded-full overflow-hidden cursor-pointer"
            initial={false}
            animate={{
              width: video.src === selectedVideo.src ? 48 : 8,
            }}
            onClick={() => {
              if (index !== playingIndex) controls.playAt(index);
            }}
          >
            <motion.div
              className={clsx(
                "absolute top-0 left-0 h-full bg-white",
                video.src === selectedVideo.src ? "block" : "hidden"
              )}
              initial={false}
              animate={{
                width: `${progress}%`,
              }}
              transition={{ duration: 0.35, bounce: 0 }}
            ></motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
