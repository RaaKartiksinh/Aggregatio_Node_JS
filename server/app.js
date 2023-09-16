const express = require('express');
const Dbconnect = require('./DbConnet');
const cors = require('cors')

const UserRouter = require('./User/UserRouts');
const AdressRouter = require('./Addres/AddresRouts');

const app = express();
Dbconnect();
app.use(express.json());
app.use(cors())


app.use('/student', UserRouter);
app.use('/address', AdressRouter);

app.get('/', (req, res) => {
    res.send({ messge: "hello" });
    console.log("first");
})


const port = 8080
app.listen(port, () => {
    console.log(`Server Start on ${port} 
    http://localhost:${port}`);
});