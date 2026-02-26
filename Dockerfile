# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
