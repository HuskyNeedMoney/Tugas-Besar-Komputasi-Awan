#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Nginx
apt-get install -y nginx

# Navigate to frontend directory and build
cd /var/www/frontend
if [ -f "package.json" ]; then
  # Build in tmp to avoid Vagrant symlink issues on Windows
  rm -rf /tmp/frontend-build
  cp -r /var/www/frontend /tmp/frontend-build
  cd /tmp/frontend-build
  npm install
  npm run build
  
  # Copy built files to Nginx root
  rm -rf /var/www/html/*
  cp -r dist/* /var/www/html/
fi

# Configure Nginx for SPA routing
cat <<EOF > /etc/nginx/sites-available/default
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html;

    server_name _;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

systemctl restart nginx

echo "Frontend VM provisioned."
