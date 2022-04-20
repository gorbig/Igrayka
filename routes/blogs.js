const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/blogs.html"))
    .post((req, res) => res.send("POST BLOGS"));
module.exports = router;