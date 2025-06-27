const Playground = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="w-full h-screen bg-amber-300"></div>
        <div className="w-full h-screen bg-green-300 grid grid-cols-1 grid-rows-3">
          <div className="row-span-2 bg-fuchsia-400"></div>
          <div className="row-span-1 bg-indigo-500"></div>
        </div>
      </div>
    </>
  );
};

export default Playground;
