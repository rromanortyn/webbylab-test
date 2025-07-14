### Architecture

This project makes use of modular achitecture. Meaning that each domain of the system is separated into its own module.
The project consists of 5 modules: bcrypt, jwt, movie, session and user. Also there is a separate shared module that contains common code.
Modules are build with layered architecture in mind. Each module has the following layers: presentation, use-case and service. All database-level entities are defined in the src/data/models folder. Database queries are implemented in services using sequelize. Use-cases are implemented in use-cases folder. Presentation layer is implemented in routes folder. Routes make use of controllers that only expect req and res object, execute the use-case and send the response.

### Running the app

To run this app you need to have docker installed on your machine.

docker run --name movies -p 8001:8050 -e JWT_SECRET=super-secret rromanortyn/movies:latest

The server will start at http://localhost:8001

To stop the container you can use the following command:
docker stop movies

