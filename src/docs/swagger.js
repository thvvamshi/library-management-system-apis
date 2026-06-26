import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Library Management System API",
            version: "1.0.0",
            description:
                "REST API for Library Management System",
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server",
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
    },

    apis: [
        "./src/docs/*.swagger.js",
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;