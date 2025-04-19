# Use an official Node runtime as a parent image
FROM node:14-slim AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

FROM alpine:3.16.7

# Add metadata labels for versioning and clarity
LABEL maintainer="Bella Ndirangu"
LABEL version="1.0.0"
LABEL description="Backend service for Brian-Yolo e-commerce platform"

WORKDIR /app

RUN apk update && apk add npm

COPY --from=build /usr/src/app /app

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]