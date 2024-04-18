# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json for both frontend and backend
COPY my-app/package*.json ./my-app/
COPY Server/package*.json ./Server/

# Install dependencies for both frontend and backend
RUN cd my-app && npm install
RUN cd Server && npm install

# Bundle frontend and backend source
COPY my-app/ ./my-app/
COPY Server/ ./Server/

# Your app binds to port 8080 for backend and 3000 for frontend, so you use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000 8080

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "start"]
