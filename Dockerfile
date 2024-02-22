# Build stage
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your SvelteKit application
RUN npm run build

# Production stage
FROM node:16-alpine AS production

WORKDIR /app

# Copy built app from the build stage
COPY --from=build /app/build .

# Your app will run on port 3000. Adjust if your app uses a different port.
EXPOSE 3000

# Start your app
CMD ["node", "index.js"]
