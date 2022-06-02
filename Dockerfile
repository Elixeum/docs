FROM docker.io/library/nginx:stable-alpine
WORKDIR /app

# Copy the source code to the container
COPY /app .

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf
