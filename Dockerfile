# Use the official lightweight Node.js 16 image.
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies for the main application
RUN npm ci --only=production

# Change directory to the 'client' folder
WORKDIR /usr/src/app/client

# Copy client application dependency manifests to the container image.
COPY client/package*.json ./

# Install dependencies for the client application
RUN npm ci 

# Change back to the original working directory
WORKDIR /usr/src/app

# Copy local code to the container image.
COPY . ./

# Build the client applicationd
WORKDIR /usr/src/app/client
RUN npm run build

# Change back to the main working directory
WORKDIR /usr/src/app

EXPOSE 3000

# Run the web service on container startup.
CMD ["node", "server.js"]
