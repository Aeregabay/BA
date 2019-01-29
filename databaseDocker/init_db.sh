#!/bin/sh
mysql -uroot -p1234 --socket=/var/run/mysqld/mysqld.sock -e "FLUSH PRIVILEGES;"
mysql -uroot -p1234 --socket=/var/run/mysqld/mysqld.sock -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
# These calls are made in order to set up the database after it is run on docker
# In case of dockerization, no changes have to be made here