# Wallpaper Spot

<img src= "https://i.postimg.cc/N0k2dtj6/11shots-so.png" alt="picture" />

This wallpaper site is built using Next.js, a React framework for building server-side rendered applications. The routes in this site are designed to be parallel and intersecting, providing users with an intuitive browsing experience. MongoDB is utilized as the database to store wallpaper data, allowing users to access and download images seamlessly. Tailwind CSS is used for styling, providing a sleek and responsive design. Additionally, Context API is implemented for state management across components.

## Technologies Used
- Next.js: Provides server-side rendering and enables a smooth user experience with parallel and intersecting routes.
- MongoDB: A NoSQL database used to store wallpaper data such as images and metadata.
- Tailwind CSS: A utility-first CSS framework used for styling the site, offering flexibility and rapid development.
- Context API: Used for state management, allowing components to share data without prop drilling.

# Getting Started
To run the Wallpaper Site locally, follow these steps:

- Clone the repository:
```bash
git clone https://github.com/lakshmanb-0/wallpaper_spot
cd wallpaper_spot
npm install
```
- Set up MongoDB:
  1. Install MongoDB if you haven't already: MongoDB Installation Guide
  2. Create a MongoDB Atlas account or set up a local MongoDB instance.
  3. Create a .env.local file in the root directory and add your MongoDB connection string:
``` bash
MONGODB_URI=your-mongodb-connection-string
npm run dev
```
