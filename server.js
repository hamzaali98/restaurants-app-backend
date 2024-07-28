require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

const DEFAULT_LOCATION = '59.3293,18.0686'; // Stockholm's coordinates

// Helper function to fetch restaurants
const fetchRestaurants = async (location) => {
    const response = await axios.get(`${GOOGLE_PLACES_API_URL}/nearbysearch/json`, {
        params: {
            key: GOOGLE_PLACES_API_KEY,
            location: location,
            radius: 5000, // Radius in meters

            type: 'restaurant',
        },
    });
    return response.data.results;
};

// Route to get all restaurants based on user's location or default to Stockholm
fastify.get('/restaurants', async (request, reply) => {
    const { lat, lon } = request.query;
    let location = DEFAULT_LOCATION;

    if (lat && lon) {
        location = `${lat},${lon}`;
    }

    try {
        const restaurants = await fetchRestaurants(location);
        reply.send(restaurants);
    } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ message: 'Error fetching restaurants' });
    }
});

// Route to get a specific restaurant by place ID
fastify.get('/restaurants/:id', async (request, reply) => {
    try {
        const placeId = request.params.id;
        const response = await axios.get(`${GOOGLE_PLACES_API_URL}/details/json`, {
            params: {
                key: GOOGLE_PLACES_API_KEY,
                place_id: placeId,
            },
        });
        reply.send(response.data.result);
    } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ message: 'Error fetching restaurant details' });
    }
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 8000 });
        console.log('Server listening on http://localhost:8000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
