const express = require("express");

const router = express.Router();

const {
    register,
    login,
    profile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const {
    registerValidator,
    loginValidator,
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");

router.post(
    "/register",
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get(
    "/profile",
    authMiddleware,
    profile
);

module.exports = router;