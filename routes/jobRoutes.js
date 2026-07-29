const express = require("express");

const router = express.Router();

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
    createJobValidator,
} = require("../validators/jobValidator");

router.get("/", getJobs);

router.get("/:id", getJobById);

router.post(
    "/",
    authMiddleware,
    authorize("recruiter"),
    createJobValidator,
    validate,
    createJob
);

router.patch(
    "/:id",
    authMiddleware,
    authorize("recruiter"),
    createJobValidator,
    validate,
    updateJob
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("recruiter"),
    deleteJob
);

module.exports = router;