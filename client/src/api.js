// Handles api routing.

let runMode = import.meta.env.MODE;
let apiURL = "https://api.todo.naspoapps.com"; // production api url

// if in development mode, use local api
if (runMode == "development") {
  apiURL = "http://localhost:3000"; // development api url
}

export default apiURL;
