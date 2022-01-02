import { Outlet } from "react-router-dom";
import { React } from "react";

function App() {
  return (
    <div className="App p-10 flex-1 overflow-y-auto">
      <Outlet />
    </div>
  );
}

export default App;
