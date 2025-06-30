import { useAtom } from "jotai";
import {
  durationAtom,
  playAtom,
  playlistAtom,
  trackAtom,
} from "../utils/moodAtom";
import { useRef, useEffect, useState } from "react";

const RelatedSong = () => {
  const [track, setTrack] = useAtom(trackAtom);
  const [playlist] = useAtom(playlistAtom);
  const [isPlaying, setIsPlaying] = useAtom(playAtom);
  const [duration, setDuration] = useAtom(durationAtom);
  const audioRef = useRef();

  // This is only for Audio
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Play song when track or isPlaying changes
  useEffect(() => {
    if (!track?.preview_url || !audioRef.current) return;

    audioRef.current.src = track.preview_url;

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.error("Playback error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [track, isPlaying]);

  const handlePlayTrack = (selectedTrack) => {
    if (track?.id === selectedTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(selectedTrack);
      setIsPlaying(true);
    }
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-slate-900 p-4 rounded-2xl">
      <h2 className="text-lg text-white font-bold mb-4">Recommended</h2>
      <div className="h-[calc(100vh-100px)] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-gray-600">
        {playlist.map((t) => (
          <div
            key={t.id}
            onClick={() => handlePlayTrack(t)}
            className={`p-3 rounded-lg flex justify-between items-center mb-3 cursor-pointer transition-all ${
              track?.id === t.id ? "bg-slate-950" : "bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={t.album?.images?.[0]?.url}
                alt="cover"
                className="w-14 h-14 rounded-md"
              />
              <div>
                <h3 className="text-md font-semibold text-white">{t.name}</h3>
                <p className="text-sm text-gray-400">
                  {t.artists?.[0]?.name} • {t.album?.name}
                </p>
              </div>
            </div>
            <div className="text-white text-sm">{duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedSong;
