const { body } = require("express-validator");

exports.createJobValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Job title is required"),

    body("company")
        .trim()
        .notEmpty()
        .withMessage("Company name is required"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 20 })
        .withMessage(
            "Description should be at least 20 characters"
        ),
];