import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App p-10 flex-1 overflow-y-auto">
      <Outlet />
    </div>
  );
}

export default App;
