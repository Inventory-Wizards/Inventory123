const express = require("express");
const router = express.Router();

// different model routers

router.use('/items', require('./Item'));

module.exports = router;
