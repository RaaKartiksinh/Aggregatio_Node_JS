const express = require('express');
const adressController = require('./AddresController');


const AdressRouter = express.Router();

AdressRouter.get('/:id', adressController.getAddres);
AdressRouter.post('/createAddress', adressController.createAddres);
AdressRouter.put('/updateAddres/:id', adressController.updateAddres);
AdressRouter.delete('/deleteAddres/:id', adressController.deleteAddres);


module.exports = AdressRouter;