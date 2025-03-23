# Use the official Node.js LTS image.
FROM node:18-alpine

# Install required dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Define the command to run the app.
CMD ["npm", "start"]
