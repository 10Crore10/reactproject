import express from 'express';
import FacultyModel from '../model/faculty.model.js';
import handleError from "../errors/handle.error.js";

const verificationRoute = express.Router();

verificationRoute.get('/mail-verification', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return handleError(res, 400, "Invalid request");
    }

    try {
        const faculty = await FacultyModel.findById(id);
        if (!faculty) {
            return handleError(res, 404, "Faculty not found");
        }

        // Here you might want to set a flag indicating that the email has been verified
        faculty.isVerified = true; // Assuming you have an `isVerified` field
        await faculty.save();

        res.status(200).send("Email verified successfully!");
    } catch (error) {
        handleError(res, 500, error.message);
    }
});

export default verificationRoute;
