FROM docker.io/library/nginx:stable-alpine
WORKDIR /docs

# Copy the source code to the container
COPY /docs .

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf
