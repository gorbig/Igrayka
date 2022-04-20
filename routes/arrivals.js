const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/arrivals.html"))
    .post((req, res) => res.send("POST ARRIVALS"));
module.exports = router;