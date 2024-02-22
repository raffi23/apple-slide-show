import Player from "./components/Player";

function App() {
  return (
    <div className="bg-[#101010] text-white">
      <div className="h-screen grid place-content-center">
        <h1 className="text-8xl">scroll up</h1>
      </div>
      <Player />
      <div className="h-screen grid place-content-center">
        <h1 className="text-8xl">scroll down</h1>
      </div>
    </div>
  );
}

export default App;
