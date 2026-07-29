const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res, next) => {
    try {
        const { title, company, location, description } = req.body;

        const job = await Job.create({
            title: title,
            company: company,
            location: location,
            description: description,
            recruiter: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Jobs
exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find()
            .populate("recruiter", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        next(error);
    }
};

// Get Single Job
exports.getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("recruiter", "name email role");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        next(error);
    }
};

// Update Job
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Ownership Check
        if (
            job.recruiter.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can update only your own jobs",
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Job
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Ownership Check
        if (
            job.recruiter.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own jobs",
            });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};