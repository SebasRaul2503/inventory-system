const express = require("express");
const { getItems, addItem } = require("../controllers/item.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/getItems", verifyToken, getItems);

router.post("/addItem", verifyToken, addItem);

module.exports = router;