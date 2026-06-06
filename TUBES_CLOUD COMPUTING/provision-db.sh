#!/bin/bash
# Update and install MySQL
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y mysql-server

# Configure MySQL to listen on all interfaces
sed -i "s/bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
systemctl restart mysql

# Secure MySQL and create database/user
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS grades_db;
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON grades_db.* TO 'admin'@'%';
FLUSH PRIVILEGES;
EOF

# Initialize Database from init.sql
if [ -f "/vagrant/database/init.sql" ]; then
  mysql -u root grades_db < /vagrant/database/init.sql
fi

echo "Database VM provisioned."
