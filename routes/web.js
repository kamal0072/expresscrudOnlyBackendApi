import express from 'express';
import {
    createStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    deleteMultipleStudents,
} from '../controllers/studentControllers.js';
import {
    filterStudents,
    sortStudents,
    paginateStudents
} from "../controllers/extraAction.js"

const router = express.Router();
//creating riutes
router.get('/allstudent', getAllStudents)
router.post('/createstudent', createStudent)
router.get('/:id', getSingleStudent)
router.put('/:id', updateStudent)
router.delete('/all-delete', deleteMultipleStudents)
router.delete('/:id', deleteStudent)

// extra routes
router.get('/filter', filterStudents)
router.get('/sort', sortStudents)
router.get('/paginate', paginateStudents)

export default router
