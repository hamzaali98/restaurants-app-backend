require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const restaurantsRoutes = require('./routes/restaurants');

// Register the CORS plugin
fastify.register(cors, {
    origin: (origin, callback) => {
        fastify.log.info(`CORS request from origin: ${origin}`);
        if (origin === 'http://localhost:3000' || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
});

// Register your routes
fastify.register(restaurantsRoutes);

// Default route for the root URL
fastify.get('/', async (request, reply) => {
    reply.send({ message: 'Welcome to the Restaurant Guide API!' });
});

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
