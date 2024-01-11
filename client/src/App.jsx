import { useState } from "react";
import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="counter-button">Click me</button>
      <h3>{count}</h3>
    </>
  );
}

export default App;
