const express = require("express");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const auditRoutes = require("./routes/audit.routes");
listRoutes = require("./routes/list.routes");
const logger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  logger.info(`[REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware para registrar respuestas
app.use((req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    logger.info(`[RESPONSE] ${res.statusCode}`);
    originalSend.call(this, body);
  };

  next();
});

app.use("/api/users", userRoutes);

app.use("/api/items", itemRoutes);

app.use("/api/audit", auditRoutes);

app.use("/api/list", listRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));   

module.exports = app;
