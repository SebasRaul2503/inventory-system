const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const { getAudits } = require("../controllers/audit.controller");

const router = express.Router();

router.get("/getAudits", verifyToken, isAdmin, getAudits);

module.exports = router;