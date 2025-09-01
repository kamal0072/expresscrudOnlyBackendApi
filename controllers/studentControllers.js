// import { mongo } from "mongoose";
import Student from "../models/student.js";
const createStudent = async (req, res) => {
    try {
        const { name, age, fees } = req.body;
        const student = await Student({
            name: name,
            age: age,
            fees: fees
        });
        await student.save();
        res.status(201).json({ 'message': "student's record created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
        // res.send(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSingleStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "This student id is not found" });
        }
        res.status(200).json(student);
        // res.send(student);
    } catch (error) {
        res.status(500).json({ message: "Somethong went wrong with id please try again or check your id" });
    };
};
const updateStudent = async (req, res) => {
    try {
        // update student record
        const { id } = req.params;
        const { name, age, fees } = req.body;
        const result = await Student.findByIdAndUpdate(
            id,
            { $set: { name, age, fees } },
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).json({ message: "This student id is not found" });
        }
        res.status(200).json({
            success: true,
            'message': "student's record updated successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "This student id is not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "student's record deleted successfully",
            data: student
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// delete multiple records of student
const deleteMultipleStudents  = async (req, res) => {
    console.log("Hi")
    try {
        const { ids } = req.body; // expecting array of ids
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of ids"
            })
        }
        const result = await Student.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} students deleted successfully`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot delete multiple students"
        })
    }
};
// make an API for Filter the data
// make an API for Sort the data
// make an API for Pagination
// 

export {
    createStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    deleteMultipleStudents,
}


