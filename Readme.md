To run this app you need to have docker installed on your machine.

docker run --name movies -p 8001:8050 -e JWT_SECRET=super-secret rromanortyn/movies:latest

The server will start at http://localhost:8001

To stop the container you can use the following command:
docker stop movies

