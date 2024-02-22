import { AnimatePresence, motion, useInView } from "framer-motion";
import { ReactEventHandler, createContext, useContext, useRef, useState } from "react";
import Controls from "./Controls/Controls";
import { videos } from "./helpers";

type Player = {
  inView: boolean;
  playing: boolean;
  progress: number;
  playingIndex: number;
  controls: {
    play: () => void;
    pause: () => void;
    repeat: () => void;
    playAt: (index: number) => void;
  };
};

const PlayerContext = createContext<Player | null>(null);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayerContext must be used inside its provider");
  return context;
};

const Player = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.5 });
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const playingIndex = Math.max(
    0,
    videos.findIndex((v) => v.src === selectedVideo.src)
  );
  const isLastVideo = playingIndex + 1 === videos.length;

  const play = () => {
    setPlaying(true);
    videoRef.current?.play().catch(console.log);
  };

  const pause = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };

  const nextVideo = () => {
    if (isLastVideo) {
      pause();
      return;
    }
    setProgress(0);
    setSelectedVideo(videos[(playingIndex + 1) % videos.length]);
  };

  const repeat = () => {
    setProgress(0);
    setSelectedVideo(videos[0]);
  };

  const playAt = (index: number) => {
    setProgress(0);
    setSelectedVideo(videos[index]);
  };

  const updateProgress: ReactEventHandler<HTMLVideoElement> = (event) => {
    setProgress((event.currentTarget.currentTime / event.currentTarget.duration) * 100);
  };

  return (
    <>
      <div ref={containerRef} className="relative h-screen p-10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedVideo.src}
            className="relative flex h-full bg-black rounded-3xl overflow-hidden"
            initial={{
              x: "100vw",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100vw",
            }}
            transition={{
              bounce: 0,
              duration: 1,
            }}
            onViewportEnter={play}
            onViewportLeave={pause}
            viewport={{ amount: 0.25 }}
          >
            <div className="absolute top-10 left-10 text-[1.75rem] leading-8">
              {selectedVideo.titles.map((title) => (
                <h2 key={title}>{title}</h2>
              ))}
            </div>

            <video
              ref={(ref) => (videoRef.current = ref)}
              className="h-full w-full bg-black object-cover"
              src={selectedVideo.src}
              muted
              onTimeUpdate={updateProgress}
              onEnded={nextVideo}
              onClick={playing ? pause : play}
            ></video>
          </motion.div>
        </AnimatePresence>
      </div>

      <PlayerContext.Provider
        value={{
          inView,
          playing,
          playingIndex,
          controls: { play, pause, repeat, playAt },
          progress,
        }}
      >
        <Controls />
      </PlayerContext.Provider>
    </>
  );
};

export default Player;
