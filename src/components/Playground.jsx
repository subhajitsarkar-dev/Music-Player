import { useAtom } from "jotai";
import CurrentSong from "./CurrentSong";
import MoodSelect from "./MoodSelect";
import { moodAtom, playAtom, playlistAtom, trackAtom } from "../utils/moodAtom";
import { useEffect } from "react";
import axios from "axios";

const Playground = () => {
  const [selectedMood] = useAtom(moodAtom);
  const [playlist, setPlaylist] = useAtom(playlistAtom);
  const [isPlaying, setIsPlaying] = useAtom(playAtom);
  const [track, setTrack] = useAtom(trackAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = import.meta.env.VITE_RAPIDAPI_KEY;
        const host = import.meta.env.VITE_RAPIDAPI_HOST;
        const url = import.meta.env.VITE_SPORTIFI_URL;

        if (!key || !host || !url) throw new Error("Missing env vars");

        const response = await axios.get(url, {
          params: {
            id: selectedMood?.value,
            offset: "0",
            limit: "10",
          },
          headers: {
            "x-rapidapi-key": key,
            "x-rapidapi-host": host,
          },
        });

        const items = response.data?.items || [];
        const valid = items.find((item) => item.track?.preview_url);
        if (items.length && valid) {
          setPlaylist(items.map((item) => item.track));
          setTrack(valid.track);
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Fetch error", error);
      }
    };

    fetchData();
  }, [selectedMood]);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="w-full h-screen">
          <div className="">
            <CurrentSong />
          </div>
        </div>
        <div className="w-full h-screen grid grid-cols-1 grid-rows-3">
          <div className="row-span-2 flex justify-center items-center">
            <MoodSelect />
          </div>
          <div className="row-span-1 bg-indigo-500"></div>
        </div>
      </div>
    </>
  );
};

export default Playground;
