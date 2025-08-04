import { useEffect } from "react";
import { getTodos } from "./apis/todoApi";

function App() {
  // js자리
  useEffect(() => {
    getTodos();
  }, []);
  // jsx자리
  return <div>App</div>;
}

export default App;
