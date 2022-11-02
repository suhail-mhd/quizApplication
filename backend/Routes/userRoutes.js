const express = require("express");
const router = express.Router();

const {getQuestion} = require('../Controllers/userControllers')

router.route("/getQuestion").get(getQuestion)

module.exports = router