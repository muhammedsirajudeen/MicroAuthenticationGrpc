# Use the official Node.js image from the Docker Hub
FROM node:20.12.2

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE 4000

# Run the app
CMD ["npm", "start"]
