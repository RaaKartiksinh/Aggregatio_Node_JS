const mongoose = require('mongoose');

class StudentModel {
    constructor() {
        this.schema = new mongoose.Schema({
            fristName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            token: { type: String, default: null }

        }, {
            timestamps: true
        });

        this.Student = mongoose.model("tbl_students", this.schema);
    }
    // Add DAta 
    createstudent(data) {
        return this.Student.create(data);
    }
    // Get Data
    getStudent() {
        return this.Student.find({}, { _id: 1, fristName: 1, lastName: 1, email: 1 });
    }
    // Update 
    updateStudent(studentId, updateData) {
        return this.Student.findByIdAndUpdate(studentId, updateData, { new: true });
    }
    // Delete 
    deleteStudent(studentId) {
        return this.Student.findByIdAndRemove(studentId);
    }


}

const studentmodel = new StudentModel();
module.exports = studentmodel;

