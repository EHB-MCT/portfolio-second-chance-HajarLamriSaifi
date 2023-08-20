FROM node:latest

# Create a new directory for the app and set it as the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
