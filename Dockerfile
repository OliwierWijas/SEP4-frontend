FROM vlaad08/smart-home-server:latest
FROM vlaad08/smart-home:latest

# Use official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Install serve globally to serve the production build
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to serve the React app
CMD ["serve", "-s", "build"]