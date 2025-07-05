# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Optional: if you're using tsconfig paths or advanced setup
# RUN npm run build

# Expose your API port
EXPOSE 3000

# Start the app with ts-node (for development)
CMD ["npx", "ts-node", "src/server.ts"]
