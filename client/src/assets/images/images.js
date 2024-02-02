// Purpose: Export all images for use in the application.
// This is how we need to work with static assets in a vite-react project.

const IMAGES = {
  githubIcon: new URL("./github_icon.png", import.meta.url).href,
};

export default IMAGES;
