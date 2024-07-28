const axios = require('axios');
const { GOOGLE_PLACES_API_URL, SEARCH_RADIUS } = require('../utils/constants');

const fetchRestaurants = async (location, apiKey) => {
    let allResults = [];
    let pageToken = '';
    let hasNextPage = true;

    while (hasNextPage) {
        const response = await axios.get(`${GOOGLE_PLACES_API_URL}/nearbysearch/json`, {
            params: {
                key: apiKey,
                location: location,
                radius: SEARCH_RADIUS,
                type: 'restaurant',
                pagetoken: pageToken,
            },
        });

        allResults = allResults.concat(response.data.results);

        if (response.data.next_page_token) {
            pageToken = response.data.next_page_token;
            // The API requires a slight delay before using the next_page_token
            await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
            hasNextPage = false;
        }
    }

    return allResults;
};

const fetchRestaurantDetails = async (placeId, apiKey) => {
    const response = await axios.get(`${GOOGLE_PLACES_API_URL}/details/json`, {
        params: {
            key: apiKey,
            place_id: placeId,
        },
    });
    return response.data.result;
};

module.exports = {
    fetchRestaurants,
    fetchRestaurantDetails,
};
