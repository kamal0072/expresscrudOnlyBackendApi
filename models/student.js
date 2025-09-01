import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    fees: { type: mongoose.Decimal128, required: true, validate: [
        (value) => value >= 5050, 
        "Minimum fees is 5050"] 
    },
});

const Student = mongoose.model("Studentbooks", studentSchema);
export default Student;
