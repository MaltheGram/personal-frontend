# Use a multi-stage build to first build the application
FROM node:19.7-alpine AS build-stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application
RUN npm run build

# Start a new stage from node:19.7-alpine to keep the image small
FROM node:19.7-alpine
WORKDIR /usr/src/app

# Only copy the built assets and necessary files from the previous stage
COPY --from=build-stage /usr/src/app/build ./build
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["node", "-r dotenv/config build"]