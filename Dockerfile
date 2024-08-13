# Step 1: Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application to the working directory
COPY . .

# Step 6: Build the Vite app
RUN npm run build

# Step 7: Use an official Nginx image to serve the build
FROM nginx:alpine

# Step 8: Copy the build output to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to the outside world
EXPOSE 80

# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]