const mongoose = require('mongoose')

const Dbconnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log('Db Connect')

    } catch (error) {
        console.log(error)
        handleError(error);

    }
}

module.exports = Dbconnect