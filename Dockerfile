# Stage 1: Build the NestJS application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the build from the builder stage
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]