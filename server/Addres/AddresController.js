const adressModel = require("./AddresModel");

class AdressController {





    // Create Addres 
    async createAddres(req, res) {
        try {
            const { user, Address1, Address2, State, City, Country, Telephone, Delivery_information } = req.body;
            if (!user || !Address1 || !Address2 || !City || !State || !Country || !Telephone || !Delivery_information) {
                return res.status(400).send({ message: "Field is required." });
            }
            const result = await adressModel.creatAdress(req.body);
            if (result) {
                return res.status(200).send({ message: "Adress created successfully", data: result })
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ messege: "Inrernal Server Error...!" });

        }
    }

    // Update Adress 
    async updateAddres(req, res) {
        try {
            const addressId = req.params.id;
            const updateData = req.body;
            

            const updatedaddres = await adressModel.updateAdress(addressId, updateData);
            if (!updatedaddres) {
                return res.status(404).send({ message: 'Addres not found...!' });
            }
            if (updatedaddres) {
                return res.status(200).send({ message: 'Addres updated successfully', data: updatedaddres });
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });

        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error...!' });
        }
    }

    // Delete Addres 
    async deleteAddres(req, res) {
        try {
            const addressId = req.params.id;
            console.log(addressId)
            const deletedAdress = await adressModel.deleteAdress(addressId);
            
            if (!deletedAdress) {
                return res.status(404).send({ message: 'Address not found' });
            }
            if (deletedAdress) {
                return res.status(200).send({ message: 'Address deleted successfully' });
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });

        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async getAddres(req, res) {
        try {
            const { id } = req.params
          
            if (!id) return res.status(400).send({ message: "Address Id Not Found...!" })


            const result = await adressModel.getAdress(id);
            if (result) {
                return res.status(200).send({ message: "Success", data: result })
            }

            if (!result) {
                return res.status(200).send({ message: "Address Is not found...!", data: result })
            }
            return res.status(500).send({ message: "Sonthing Went Wrong...!" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ messege: "Inrernal Server Error...!" })

        }
    }



}
const adressController = new AdressController();
module.exports = adressController;

