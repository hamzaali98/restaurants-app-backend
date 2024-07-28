const { fetchRestaurants, fetchRestaurantDetails } = require('../services/googlePlacesService');
const { DEFAULT_LOCATION } = require('../utils/constants');

const restaurantsRoutes = async (fastify, options) => {
    fastify.get('/restaurants', async (request, reply) => {
        const { lat, lon } = request.query;
        let location = DEFAULT_LOCATION;

        if (lat && lon) {
            location = `${lat},${lon}`;
        }

        try {
            const restaurants = await fetchRestaurants(location, process.env.GOOGLE_PLACES_API_KEY);
            reply.send(restaurants);
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ message: 'Error fetching restaurants' });
        }
    });

    fastify.get('/restaurants/:id', async (request, reply) => {
        try {
            const placeId = request.params.id;
            const restaurantDetails = await fetchRestaurantDetails(placeId, process.env.GOOGLE_PLACES_API_KEY);
            reply.send(restaurantDetails);
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ message: 'Error fetching restaurant details' });
        }
    });
};

module.exports = restaurantsRoutes;
