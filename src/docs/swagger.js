import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Library Management System API",
            version: "1.0.0",
            description: "REST API Documentation",
        },

        servers: [
            {
                url: "http://localhost:5000/api",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;