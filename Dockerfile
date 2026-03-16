# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Accept VITE_API_URL as a build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
# Note: Since the root is configured to 'frontend' in vite.config.ts,
# vite build will process files within 'frontend/'
RUN npm run build

# Final Stage (Nginx)
FROM nginx:stable-alpine AS final

# Copy build output from build stage
# By default, vite outputs to 'frontend/dist' when root is 'frontend'
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Add custom nginx config to handle SPA routing (redirect all to index.html)
RUN printf "server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files \$uri \$uri/ /index.html;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
