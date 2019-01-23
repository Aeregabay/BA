## Pull the mysql:5.7 image
FROM mysql:8.0.12

## The maintainer name and email
MAINTAINER Your Name <arik@gmx.ch>

# database = mytable and password for root = 1234
ENV MYSQL_DATABASE=mytable \
    MYSQL_ROOT_PASSWORD="1234" \
    MYSQL_USER="root" \
    MYSQL_HOST="localhost"

# when container will be started, we'll have the database created with this schema
COPY ./clean_dump.sql /docker-entrypoint-initdb.d/