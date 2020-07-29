docker build . --tag corenter
docker run -p 8080:8080 -d corenter
