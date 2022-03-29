# CM4025-backend
Enterprise Web Systems
Backend branch

This branch contains code responsible for WebAPI for CM4025 coursework. 

It's written using typescript. It uses mongoose for communication with mongodb, express + morgan as middleware, jwtwebtoken for authentication and docker for containerization.

If you'd like to use docker, first make sure it is installed on your machine. Then from the app directory, where Dockerfile sits, run ```docker-compose build``` to build the container and then ```docker-compose up``` to run container. Docker container has own volume for storing database data. 

If you'd like to run it without docker, first run ```npm install``` from app directory and then ```npm run dev```. Any changes made to typescript files while code is running will be automatically updated and project will re-run itself. 

The API contians /health endpoint which can be used to check if API is working properly. To call it go to web browser or use postman or curl:
```http://localhost:8000/api/health``` if ran locally
or 
```https://server_ip/api/health``` if run from azure or any other provider.

The response will return ingformation such as uptime, success message and current date.

API calls will follow these rules: 
https://{server_ip}/api/{collection_name}/{resource_id}

```server_ip``` might be ```localhost:8000``` or heroku / azure / aws ip address.
```{collection_name}``` resources from that collection will be considered. Eg. if new user will be created, existing user will be updated, given user will be deleted.
```{resource_id}``` optional parameter for pointing resource with given id or ant other attribute. Eg. if use with particular id should be removed.

For different actions different HTTP methods are used: 
```GET``` - eturns resource
```POST``` - ccepts resource, processes it and returns it on success.
```PUT``` - 
```PATCH``` - 
```DELETE``` - delete resources with given id / attribute.

For setting environmental variables create .env file and provide values for:
```NODE_ENV``` - if ```development``` used, there is an extra step for seeding database on first run.
```PORT``` - port where Web API will be operating 
```MONGO_PATH=0.0.0.0:27017/{database_name}``` - if database in local environment, no Docker, is used
```MONGO_PATH=mongo:27017/{datbase_name}``` - if database in docker environment will be used
```MONGO_PATH=@cluster0.gvfeg.mongodb.net/{database_name}``` - if mongo atlas db will be used
```MONGO_USER``` - username for atlas mongo connection
```MONGO_PASSWORD``` - password for atlas mongo connection
```JWT_SECRET``` - web token secret used for hashing
```ADMIN_INIT_PASS``` - optional; used as password for admin account during initial database seeding
```USER_INIT_PASS``` - optional; used as password for regulat user account during initial database seeding