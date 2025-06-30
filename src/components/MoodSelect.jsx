import { useAtom } from "jotai";
import { moodAtom } from "../utils/moodAtom";

const moods = [
  { id: "happy", src: "./happy-mood.png", value: "2fuHDSyPq89M21pqTnUNim" },
  { id: "angry", src: "/angry-mood.png", value: "3JNWpteYvH3ynMcyPcvxfx" },
  { id: "worried", src: "/worried-mood.png", value: "2v8dbUhRp5m3ssj4PeBzCq" },
  { id: "sad", src: "/sad-mood.png", value: "4icXG0elrBxzTn5jSfJy1w" },
  { id: "neutral", src: "/neutral-mood.png", value: "4YtjDhpJ2vUeYwu4J8WV34" },
  { id: "excited", src: "/excited-mood.png", value: "1bvq6qm3FL2HxvE8UjKOqr" },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useAtom(moodAtom);
  console.log(selectedMood);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="font-papa text-3xl border-2 px-6 py-1.5 rounded-xl bg-black text-white">
        Choose Your Mood
      </div>
      <div className="relative w-[350px] h-[320px] rounded-[30px] shadow-md flex justify-center items-center bg-slate-900/10 backdrop-blur-sm">
        <div className="w-[130px] h-[130px] border-[3px] border-slate-900 rounded-[25px] flex justify-center items-center z-10">
          {selectedMood ? (
            <img
              src={selectedMood.src}
              alt={selectedMood.id}
              className="w-[90%] h-[90%] object-contain"
            />
          ) : (
            <span className="text-sm text-gray-600">No mood selected</span>
          )}
        </div>

        {moods.map((mood, i) => {
          const angle = (i / moods.length) * 2 * Math.PI;
          const radius = 120;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <button
              key={mood.id}
              className="absolute w-[60px] h-[60px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={() => setSelectedMood(mood)}
            >
              <img
                src={mood.src}
                alt={mood.id}
                className="w-full h-full object-contain rounded-xl hover:scale-110 transition-transform"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
