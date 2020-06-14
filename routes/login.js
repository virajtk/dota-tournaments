const express = require("express");
const router = express.Router();
const User = require("../models/User");

// User Login Verfication
router.post("/user", function (req, res, next) {
  try {
    User.findOne(req.body).then(function (user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "no user found" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
