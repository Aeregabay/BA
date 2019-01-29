# This Dockerfile functions.
# Pull the mysql:image
FROM mysql:8.0.12

# database = mytable and password for root = 1234
ENV MYSQL_DATABASE mytable
ENV MYSQL_ROOT_PASSWORD 1234 
ENV MYSQL_USER root 
ENV MYSQL_HOST=localhost
# ENV MYSQL_PASSWORD root 
# ENV MYSQL_ALLOW_EMPTY_PASSWORD yes 

# when container will be started, we'll have the database created with this schema
ADD ./clean_dump.sql /docker-entrypoint-initdb.d/
ADD ./init_db.sh /docker-entrypoint-initdb.d/
