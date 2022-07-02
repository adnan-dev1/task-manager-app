# Task Manager App

A simple task manager app handles all CRUD operations on tasks (create, view, update and delete) using **Node js** and **MongoDB** as back-end and **React js** for front-end.

### Prerequisites for locally deployment

* Node v16.10.0
* npm v8.11.0
* MongoDB

### Prerequisites for docker deployment

* Docker
* Docker Compose

### First time configurations

-- **Back-End Side:**

* cd task-manager-app/backend

* touch .env ==> add the following environment variables:

		PORT=5000 (5000 is an example)
		MONGO_URL=mongodb://localhost:27017

-- **Front-End Side:**

* cd ../frontend/

* touch .env ==> add the following environment variables:

		REACT_APP_API_ENDPOINT=http://localhost:5000 (the same port 5000 as used above)

### Deployment locally

* Go to backend folder and execute these commands:

		npm install 
		npm run seed (optional to populate the database)
		npm start

* Go to frontend folder and execute these commands:

		npm install 
		npm start

* Open the app on http://localhost:3000

### Deployment with docker

* Go to task-manager-app folder and execute these commands:

		docker-compose build 
		docker-compose up

* Open the app on http://localhost:3000
