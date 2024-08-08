const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    etype: {
        type: String,
        require: true,
        
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true

    }
})

const TypePayment = mongoose.model('type',typeSchema);
module.exports = TypePayment;
