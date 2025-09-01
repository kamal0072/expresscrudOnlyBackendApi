import Student from "../models/student.js";
// ✅ Filter API
const filterStudents = async (req, res) => {
    try {
        const { name, age, fees } = req.query;

        let filter = {};

        if (name) {
            // Case-insensitive search
            filter.name = { $regex: name, $options: "i" };
        }
        if (age) {
            filter.age = { $regex: age, $options: "i" };
        }

        const students = await Student.find(filter);
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Sort API
const sortStudents = async (req, res) => {
    try {
        const { sortBy, order } = req.query;
        // Default: sort by name ascending
        const sortField = sortBy || "name";
        const sortOrder = order === "desc" ? -1 : 1;

        const students = await Student.find().sort({ [sortField]: sortOrder });
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Pagination API
const paginateStudents = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        const students = await Student.find().skip(skip).limit(limit);

        const totalDocs = await Student.countDocuments();

        res.status(200).json({
            success: true,
            page,
            limit,
            totalPages: Math.ceil(totalDocs / limit),
            totalRecords: totalDocs,
            data: students
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    filterStudents,
    sortStudents,
    paginateStudents,
};
