# Base image is node version 18
FROM node:18

# Working direcroty for our docker image is /app
WORKDIR /app

# Copy package.json and package-lock.json to our working directory (/app)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all files from current directory to our image's working directory (/app)
COPY . .

# Expose port 3000. This is the port that our express app is running on.
# Since docker images run in a container, we need to expose the port to the host machine.
EXPOSE 3000

# Run the app
CMD ["npm", "start"]