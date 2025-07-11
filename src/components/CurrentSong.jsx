import { useAtom } from "jotai";
import {
  durationAtom,
  playAtom,
  playlistAtom,
  trackAtom,
} from "../utils/moodAtom";
import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TfiControlPause } from "react-icons/tfi";
import { SlControlEnd, SlControlStart } from "react-icons/sl";

const CurrentSong = () => {
  const [track, setTrack] = useAtom(trackAtom);
  const [playlist, setPlaylist] = useAtom(playlistAtom);
  const [isPlaying, setIsPlaying] = useAtom(playAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useAtom(durationAtom);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = (selectedTrack) => {
    if (track?.id !== selectedTrack.id) {
      setTrack(selectedTrack);
      setShouldAutoPlay(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    } else {
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleEnded = () => {
    const currentIndex = playlist.findIndex((t) => t.id === track.id);
    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) {
      setTrack(playlist[nextIndex]);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    } else {
      setIsPlaying(false); // stop at end
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const playPrevious = () => {
    const currentIndex = playlist.findIndex((t) => t.id === track.id);
    if (currentIndex > 0) {
      setTrack(playlist[currentIndex - 1]);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    const currentIndex = playlist.findIndex((t) => t.id === track.id);
    if (currentIndex < playlist.length - 1) {
      setTrack(playlist[currentIndex + 1]);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2 pb-2 text-slate-100">
          <h1 className="font-papa text-3xl bg-slate-100 px-10 py-2 rounded-lg text-slate-900 flex flex-col">
            ViveZone{" "}
          </h1>
        </div>
        {track && (
          <>
            <div className="flex flex-col items-center border p-5 bg-slate-100 backdrop-blur-sm rounded-xl">
              <div className="">
                <img
                  src={track.album?.images?.[0]?.url}
                  alt="album"
                  className="w-[300px] h-64 rounded-xl"
                />
              </div>
              <div className="text-left w-[300px] pt-3">
                <h1 className="text-2xl font-mon font-semibold leading-7 line-clamp-1">
                  {track.name}
                </h1>
                <p className="text-base text-gray-400 fontmon font-medium line-clamp-1">
                  {track.artists?.[0]?.name} • {track.album?.name}
                </p>
              </div>
              <div className="">
                <div className="mt-4 w-[300px]">
                  <div className="flex justify-between text-sm font-mon text-gray-400 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 animate-pulse blur-sm opacity-30"
                      style={{
                        width: `${(currentTime / duration) * 100 || 0}%`,
                      }}
                    />

                    <div
                      className="absolute top-0 left-0 h-full bg-emerald-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_6px_1px_rgba(34,197,94,0.4)]"
                      style={{
                        width: `${(currentTime / duration) * 100 || 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={playPrevious}
                  className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-105 text-slate-100 text-xl"
                >
                  <SlControlStart />
                </button>

                <button
                  onClick={() =>
                    isPlaying ? handlePause() : handlePlay(track)
                  }
                  className={`p-4 rounded-full cursor-pointer bg-slate-900 hover:bg-slate-950 transition-all duration-200 hover:scale-110 text-slate-100 text-xl shadow-md`}
                >
                  {isPlaying ? <TfiControlPause /> : <FaPlay />}
                </button>

                <button
                  onClick={playNext}
                  className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-105 text-slate-100 text-xl"
                >
                  <SlControlEnd />
                </button>
              </div>

              <audio
                ref={audioRef}
                src={track?.preview_url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  setDuration(audioRef.current.duration);
                  if (shouldAutoPlay) {
                    audioRef.current.play();
                    setIsPlaying(true);
                    setShouldAutoPlay(false); // reset flag
                  }
                }}
                onEnded={handleEnded}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CurrentSong;
