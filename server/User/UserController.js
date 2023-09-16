const studentmodel = require("./UserModel");

class StudentConntroler {

    // Create Student 
    async addStudent(req, res) {
        try {
            const { fristName, lastName, email, password } = req.body;
            if (!fristName || !lastName || !email || !password) {
                return res.status(400).send({ message: "Field is required." });
            }
            const result = await studentmodel.createstudent(req.body);
            if (result) {
                return res.status(200).send({ message: "Student created successfully", data: result });
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ messege: "Inrernal Server Error...!" });
        }
    }

    // Get Students 
    async getstudent(req, res) {
        try {
            const result = await studentmodel.getStudent();
            if (result) {
                return res.status(200).send({ message: "Student Get All Data Successfully", data: result });
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ messege: "Inrernal Server Error...!" });
        }
    }

    // update Student 
    async updateStudent(req, res) {
        try {
            const studentId = req.params.id;
            const updateData = req.body;
            console.log(studentId)
            console.log(updateData)
            // return

            const updatedStudent = await studentmodel.updateStudent(studentId, updateData);
            if (!updatedStudent) {
                return res.status(404).send({ message: 'Student not found...!' });
            }
            if (updatedStudent) {
                return res.status(200).send({ message: 'Student updated successfully', data: updatedStudent });
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error...!' });
        }
    }

    // delete Student 
    async deleteStudent(req, res) {
        try {
            const studentId = req.params.id;
            const deletedStudent = await studentmodel.deleteStudent(studentId);
            if (!deletedStudent) {
                return res.status(404).send({ message: 'Student not found' });
            }
            return res.status(200).send({ message: 'Student deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

}

const studentconntroler = new StudentConntroler();
module.exports = studentconntroler;