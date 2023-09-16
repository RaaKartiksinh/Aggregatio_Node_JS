const express = require('express')
const studentconntroler = require('./UserController')



const UserRouter = express.Router();

UserRouter.get('/', studentconntroler.getstudent);
UserRouter.post('/createStudent', studentconntroler.addStudent);
UserRouter.patch('/updateStudent/:id', studentconntroler.updateStudent);
UserRouter.delete('/deleteStudent/:id', studentconntroler.deleteStudent);


module.exports = UserRouter;