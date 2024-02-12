# Use a specific version of node image from the Alpine family for a smaller image size
FROM node:20.11.0-alpine3.18 as builder

# Create app directory in the container
WORKDIR /app

# Install app dependencies by copying package.json and package-lock.json first
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build your app
RUN npm run build

FROM node:20.11.0-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy the build directory and package.json files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Clean npm cache
RUN npm cache clean --force

# Command to run your app
CMD ["node", "build/index.js"]
