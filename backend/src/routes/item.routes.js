const express = require("express");
const { getItems } = require("../controllers/item.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/getItems", verifyToken, getItems);

module.exports = router;