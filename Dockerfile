# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
COPY backend/ ./backend/

# Copy frontend files
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --production

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install --production

# Expose backend and frontend ports (adjust as needed)
EXPOSE 8756 8734

# Start both backend and frontend (use npm scripts or a process manager for production)
# Example: start backend only
CMD ["npm", "run", "start"]
# To run both, consider using a process manager like pm2 or run two containers
