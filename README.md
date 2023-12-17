# Fidenz_Tech

This web application was developed to call openweathermap.org weather `Restful` APIs to get the latest weather information and present it.

We used local storage as `data caching mechanism` for this application by storing data coming from oepnweathermap.org and serving it when the user request the same data in subsequent requests.


## Deployment using Docker

This project contains only one Docker file:

| File        | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| Dockerfile        | A default Dockerfile for building and running your Node.js application |



### Building the Docker image for your application

#### 1. Create a file named Dockerfile (without any file extension) in your project directory using terminal.
	touch Dockerfile	- Mac/Linux
	type nul > Dockerfile	- Windows

#### 2. Add/Update Content based on the application to the Dockerfile.

#### 3. Build the image using the following commands in the terminal (make sure you're in the app `directory`) :
	docker build -t fidenztech .

### Running the Docker image for your application
	docker run -d -p 8080:80 fidenztech

* To view all running docker images, you can use docker containerization tool for developers(need to download).
* Or, in the terminal,
	`docker images`
