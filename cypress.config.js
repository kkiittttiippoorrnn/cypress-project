const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://booking-front-three.vercel.app/", 
    env: {
      apiUrl: "http://localhost:3001/users" 
    },
  },
});