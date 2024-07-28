# Restaurants Nearby Backend

This project provides a backend API for fetching nearby restaurants using the Google Places API. It is built with [Fastify](https://www.fastify.io/).

## Requirements

- **Node.js:** Version 18 or higher is required. You can download it from the [official Node.js website](https://nodejs.org/).


## API Routes

1. **Fetch All Restaurants**
    - **Endpoint:** `/restaurants`
    - **Method:** `GET`
    - **Description:** Fetches all nearby restaurants within a 5km radius.

2. **Fetch Restaurant Details by ID**
    - **Endpoint:** `/restaurants/:id`
    - **Method:** `GET`
    - **Description:** Fetches detailed information for a specific restaurant identified by its ID.


## Steps to Run the Project Locally

### 1. Install Project Dependencies

In the project directory, run `npm install`.\
This will install all the packages used by the project and their dependencies.

### 2. Get a Google Places API Key

In order to get a Google Places API key:

- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Create an API key that can access the Places API.

### 3. Add the API Key to the Project

In the root directory of the project, create a `.env` file.\
In the `.env` file, assign the **API key** generated to a variable `GOOGLE_PLACES_API_KEY`.

```env
GOOGLE_PLACES_API_KEY="XXXXXXXXXXXXX"
```

### 4. Start the Server

Run `yarn start` or `npm start` to run the app.

The server will start on [http://localhost:8000](http://localhost:8000)
