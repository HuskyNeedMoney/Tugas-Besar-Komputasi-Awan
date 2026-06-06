#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally to run backend
npm install -g pm2

# Navigate to backend directory and install dependencies
if [ -f "/var/www/backend/package.json" ]; then
  # Copy to /opt to avoid Vagrant symlink issues on Windows
  rm -rf /opt/backend
  cp -r /var/www/backend /opt/backend
  cd /opt/backend
  npm install
  
  # Start or restart backend with PM2
  pm2 start src/index.js --name "backend" || pm2 restart backend
  pm2 save
  pm2 startup systemd -u vagrant --hp /home/vagrant
fi

echo "Backend VM provisioned."
