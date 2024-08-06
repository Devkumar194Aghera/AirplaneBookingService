const express = require("express");

const router = express.Router();
const v1APIRoute = require("./v1/index");

router.use("/v1", v1APIRoute);

module.exports = router;
