const express = require("express");
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const auditRoutes = require("./routes/audit.routes");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/users", userRoutes);

app.use("/api/items", itemRoutes);

app.use("/api/audit", auditRoutes);
module.exports = app;