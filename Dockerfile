# Use multi-stage builds
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine

# Copy build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (if needed, otherwise use default)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]