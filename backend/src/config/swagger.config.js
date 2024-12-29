const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Esta es la documentación de mi API",
  },
  servers: [
    {
      url: "http://localhost:3000", // Cambia esto si tu URL base es diferente
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Asegúrate de que las rutas están en esta ubicación
};

const swaggerSpec = require("swagger-jsdoc")(options);

module.exports = swaggerSpec;
