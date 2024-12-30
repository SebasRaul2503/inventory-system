const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Esta es la documentación de la API",
  },
  servers: [
    {
      url: "http://localhost:3000/api", // URL base de la API
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // Especifica el formato del token
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // ubicacion de las rutas a documentar
};

const swaggerSpec = require("swagger-jsdoc")(options);

module.exports = swaggerSpec;
