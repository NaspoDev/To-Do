import "./css/App.css";
import ToDoContainer from "./components/ToDoContainer";

function App() {
  return (
    <div className="App">
      <ToDoContainer />
      <div className="footer">
        <a
          href="https://github.com/NaspoDev/To-Do-WebApp"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="github-icon"
            src="./src/assets/images/github_icon.png"
            alt="Github"
          />
        </a>
        <p className="credit-tag">
          Created by{" " /* Add a space before "Naspo"*/}
          <a href="https://naspo.dev/" target="_blank" rel="noreferrer">
            Naspo
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default App;
