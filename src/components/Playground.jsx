import CurrentSong from "./CurrentSong";
import MoodSelect from "./MoodSelect";

const Playground = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="w-full h-screen bg-amber-300">
          <CurrentSong />
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
