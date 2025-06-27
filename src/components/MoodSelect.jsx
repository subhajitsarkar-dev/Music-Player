import { useState } from "react";

const moods = [
  { name: "happy", src: "./happy-mood.png", value: "1Eb3hIq4uBOicvBE8s3cQx" },
  { name: "angry", src: "/angry-mood.png", value: "2h8z6Qo0xI05n4pNjREQsE" },
  {
    name: "worried",
    src: "/worried-mood.png",
    value: "2v8dbUhRp5m3ssj4PeBzCq",
  },
  { name: "sad", src: "/sad-mood.png", value: "4icXG0elrBxzTn5jSfJy1w" },
  {
    name: "neutral",
    src: "/neutral-mood.png",
    value: "4YtjDhpJ2vUeYwu4J8WV34",
  },
  {
    name: "excited",
    src: "/excited-mood.png",
    value: "1bvq6qm3FL2HxvE8UjKOqr",
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("/Question-mark.png");

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="font-papa text-3xl border-2 px-6 py-1.5 rounded">
        Choose Your Mood
      </div>
      <div className="relative w-[350px] h-[320px] rounded-[30px] shadow-md flex justify-center items-center bg-white/20">
        <div className="w-[130px] h-[130px] border-[3px] border-black rounded-[25px] flex justify-center items-center z-10 bg-white">
          <img
            src={selectedMood}
            alt="Selected mood"
            className="w-[90%] h-[90%] object-contain"
          />
        </div>

        {moods.map((mood, i) => {
          const angle = (i / moods.length) * 2 * Math.PI;
          const radius = 120;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <button
              key={mood.name}
              className="absolute w-[60px] h-[60px] transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={() => setSelectedMood(mood.src)}
            >
              <img
                src={mood.src}
                alt={mood.name}
                className="w-full h-full object-contain rounded-xl hover:scale-110 transition-transform"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
