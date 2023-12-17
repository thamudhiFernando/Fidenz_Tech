 # syntax=docker/dockerfile:1

#FROM nginx
#COPY index.html /usr/share/nginx/html


# Use an official Node.js runtime as a base image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Expose the port on which your application will run
EXPOSE 80

# Command to run your application
CMD ["nginx", "-g", "daemon off;"]
