const mongoose = require('mongoose')

class AddresModel {
    constructor() {
        this.adress = mongoose.Schema({
            user: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_students" },
            Address1: { type: String, required: true },
            Address2: { type: String, required: true },
            City: { type: String, required: true },
            State: { type: String, required: true },
            Country: { type: String, required: true },
            Telephone: { type: String, required: true },
            Delivery_information: { type: String, required: true }

        }, {
            timestamps: true
        })
        this.Adress = mongoose.model("tbl_addresses", this.adress)
    }

    creatAdress(data) {
        return this.Adress.create(data)
    }
    // Update 
    updateAdress(adressId, updateData) {
        return this.Adress.findByIdAndUpdate(adressId, updateData, { new: true });
    }
    // Delete 
    deleteAdress(adressId) {
        return this.Adress.findByIdAndRemove(adressId);
    }

    // Get Data
    getAdress(id) {
        const pipline = [
            {
                $match: { user: new mongoose.Types.ObjectId(id) }
            }, {
                $group: {
                    _id: '$user',
                    Address: {
                        $push: {
                            _id: '$_id',
                            Address1: "$Address1",
                            Address2: "$Address2",
                            City: "$City",
                            State: "$State",
                            Country: "$Country",
                            Telephone: "$Telephone",
                            Delivery_information: "$Delivery_information"

                        }
                    }

                }
            },
            {
                $lookup: {
                    from: "tbl_students",
                    localField: "_id",
                    foreignField: "_id",
                    as: "User"
                }
            },
            {
                $unwind: "$User",

            }



        ]

        return this.Adress.aggregate(pipline)

    }




}
const adressModel = new AddresModel();
module.exports = adressModel;