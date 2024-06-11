# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use an official lightweight Node.js runtime as a second stage build
FROM node:14-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install serve to serve the application
RUN npm install -g serve

# Copy the build output from the first stage build
COPY --from=0 /app/build ./build

# Expose port 8081 on the container
EXPOSE 8081

# Run the application
CMD ["serve", "-s", "build", "-l", "8081"]